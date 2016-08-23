/* @flow */

import {
  compose,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP,
  curry,
  map,
  prop
} from 'ramda';
import rp from 'request-promise';

//TODO: Move to more generic place
const curriedRequest = curry((opts: JSONObject): Promise<JSONObject> => rp(opts));
const curriedPromiseAll = curry((arr: [Promise<any>]): Promise<any> => Promise.all(arr));

const searchByIdUrl = curry((id: string): Promise<mixed> => Promise.resolve({ uri:`http://imdb.wemakesites.net/api/${id}`, json: true }));
const searchTermUrl = curry((term: string): Promise<mixed> => Promise.resolve({ uri:`http://imdb.wemakesites.net/api/search?q=${term}`, json: true }));

export const searchById = (id: string): Promise<JSONObject> => composeP(prop('data'), curriedRequest, searchByIdUrl)(id);
export const searchTerm = (term: string): Promise<ImdbTermResultData> => composeP(prop('data'), curriedRequest, searchTermUrl)(term);
export const searchTerms = (terms: [string]): [Promise<ImdbTermResultData>] => map(searchTerm)(terms);
export const getFilmCast = (cast: [string]): Promise<[ImdbTermResultData]> => compose(curriedPromiseAll, searchTerms)(cast);
