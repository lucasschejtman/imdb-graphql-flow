/* @flow */

import {
  compose,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP,
  curry,
  map,
  prop,
  path,
  head
} from 'ramda';
import rp from 'request-promise';

//TODO: Move to more generic place
const curriedRequest = curry((opts: JSONObject): Promise<JSONObject> => rp(opts));
const curriedPromiseAll = curry((arr: [Promise<any>]): Promise<any> => Promise.all(arr));

const searchByIdUrl = curry((id: string): Promise<mixed> => Promise.resolve({ uri:`http://imdb.wemakesites.net/api/${id}`, json: true }));
const searchTermUrl = curry((term: string): Promise<mixed> => Promise.resolve({ uri:`http://imdb.wemakesites.net/api/search?q=${term}`, json: true }));
const searchOmdpUrl = curry((id: string): Promise<mixed> => Promise.resolve({ uri: `http://www.omdbapi.com/?i=${id}plot=short&r=json`, json: true }));

export const searchById = (id: string): Promise<JSONObject> => composeP(prop('data'), curriedRequest, searchByIdUrl)(id);
export const searchTerm = (term: string): Promise<ImdbTermResultData> => composeP(prop('data'), curriedRequest, searchTermUrl)(term);
export const searchTerms = (terms: [string]): [Promise<ImdbTermResultData>] => map(searchTerm)(terms);
export const getFilmCast = (cast: [string]): Promise<[ImdbTermResultData]> => compose(curriedPromiseAll, searchTerms)(cast);
export const searchOmdb = (id: string): Promise<OmdbTitleResultData> => composeP(curriedRequest, searchOmdpUrl)(id);

//TODO: Move these functions somewhere else
export const filmCast = (data: ImdbTermResultData): ?[string] => path(['results', 'names'])(data);
export const castIds = (cast: [{ [key:string]: string }]): [string] => map(prop('id'))(cast);
//export const getFirstCastName = (cast: ImdbTermResultData): string => compose(prop('id'), head, path(['results', 'names']))(cast);
