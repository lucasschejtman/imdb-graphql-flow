/* @flow */

import { request, resolve, promiseAll } from '../utils/curry';

import { compose, curry, map, prop,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const searchByIdUrl   = curry((id: string): Promise<RequestOptions> => Promise.resolve({ uri:`http://imdb.wemakesites.net/api/${id}`, json: true }));
const searchTermUrl   = curry((term: string): Promise<RequestOptions> => Promise.resolve({ uri:`http://imdb.wemakesites.net/api/search?q=${term}`, json: true }));
const searchOmdbUrl   = curry((id: string): Promise<RequestOptions> => Promise.resolve({ uri: `http://www.omdbapi.com?i=${id}`, json: true }));
const searchSeasonUrl = curry((id: string, number: number): Promise<RequestOptions> => Promise.resolve({ uri: `http://www.omdbapi.com?i=${id}&Season=${number}`, json: true }));

const getEpisodes     = curry((ids: [string]): Promise<OmdbSeasonResultData> => composeP(promiseAll, map(request), promiseAll, map(searchOmdbUrl), resolve)(ids));
const getSeasonEps    = curry((id: string, number: number): [JSONObject] => composeP(prop('Episodes'), request, searchSeasonUrl(id))(number));

export const searchById   = (id: string): Promise<JSONObject> => composeP(prop('data'), request, searchByIdUrl)(id);
export const searchTerm   = (term: string): Promise<ImdbTermResultData> => composeP(prop('data'), request, searchTermUrl)(term);
export const searchTerms  = (terms: [string]): Promise<ImdbTermResultData> => compose(promiseAll, map(searchTerm))(terms);
export const searchOmdb   = (id: string): Promise<OmdbTitleResultData> => composeP(request, searchOmdbUrl)(id);
export const searchSeason = curry((id:string, number: number): [OmdbSeasonResultData] => composeP(getEpisodes, map(prop('imdbID')), getSeasonEps(id))(number));
