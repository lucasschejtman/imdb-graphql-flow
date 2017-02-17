/* @flow */

import { trace, fetch } from '../utils/curry';

import { compose, curry, map, prop } from 'ramda';

const searchByIdUrl   = (id: string): RequestOptions => ({ uri:`http://imdb.wemakesites.net/api/${id}`, json: true });
const searchOmdbUrl   = (id: string): RequestOptions => ({ uri: `http://www.omdbapi.com?i=${id}`, json: true });
const searchSeasonUrl = curry((id: string, number: number): RequestOptions => ({ uri: `http://www.omdbapi.com?i=${id}&Season=${number}`, json: true }));

const getEpisodes     = curry((ids: [string]): Future<OmdbSeasonResultData> => compose(map(fetch), map(searchOmdbUrl))(ids));
const getSeasonEps    = curry((id: string, number: number): Future<[JSONObject]> => compose(map(prop('Episodes')), fetch, searchSeasonUrl(id))(number));

export const searchById   = (id: string): Future<JSONObject> => compose(map(prop('data')), fetch, searchByIdUrl)(id);
export const searchOmdb   = (id: string): Future<OmdbTitleResultData> => compose(fetch, searchOmdbUrl)(id);
export const searchSeason = curry((id:string, number: number): Future<[OmdbSeasonResultData]> => compose(
    /*  Workaround until Episodes API is back */
    // getEpisodes, map(prop('imdbID')),
    getSeasonEps(id))(number));
