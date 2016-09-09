/* @flow */

import { request, promiseAll } from '../utils/curry';

import { compose, curry, map, prop,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const searchByIdUrl = curry((id: string): Promise<mixed> => Promise.resolve({ uri:`http://imdb.wemakesites.net/api/${id}`, json: true }));
const searchTermUrl = curry((term: string): Promise<mixed> => Promise.resolve({ uri:`http://imdb.wemakesites.net/api/search?q=${term}`, json: true }));
const searchOmdbUrl = curry((id: string): Promise<mixed> => Promise.resolve({ uri: `http://www.omdbapi.com?i=${id}&plot=short&r=json`, json: true }));

export const searchById   = (id: string): Promise<JSONObject> => composeP(prop('data'), request, searchByIdUrl)(id);
export const searchTerm   = (term: string): Promise<ImdbTermResultData> => composeP(prop('data'), request, searchTermUrl)(term);
export const searchTerms  = (terms: [string]): [Promise<ImdbTermResultData>] => map(searchTerm)(terms);
export const getFilmCast  = (cast: [string]): Promise<[ImdbTermResultData]> => compose(promiseAll, searchTerms)(cast);
export const searchOmdb   = (id: string): Promise<OmdbTitleResultData> => composeP(request, searchOmdbUrl)(id);
