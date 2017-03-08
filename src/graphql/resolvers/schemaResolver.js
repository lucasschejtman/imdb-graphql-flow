/* @flow */

import { trace, gqlError } from '../../utils/curry';
import * as cache from '../../utils/cache';
import { startsWith } from '../../utils/string';
import { searchById, searchOmdb } from '../../services/imdbService';

import R from 'ramda';

const isTitle         = (id: string): bool => startsWith('tt')(id);
// Unfortunately the GraphQL driver expect a promise
const searchPerson    = (id: string): Promise<OmdbTitleResultData> => searchById(id).promise().then(cache.set(id)).catch(console.log);
const searchTitle     = (id: string): Promise<OmdbTitleResultData> => searchOmdb(id).promise().then(cache.set(id)).catch(console.log);
const searchResource  = (id: string): Promise<OmdbTitleResultData|ImdbPersonData> => R.ifElse(isTitle, searchTitle, searchPerson)(id);
const fromCacheOrApi  = (id: string): Promise<OmdbTitleResultData|ImdbPersonData> => R.ifElse(cache.has, cache.get, searchResource)(id);

export const search   = (root: any, { id }: any): Promise<OmdbTitleResultData|ImdbPersonData> => R.compose(fromCacheOrApi, R.trim)(id);

// test update
export const updateTitle = (root: any, { id, title }: any) => {
    const update = R.compose(cache.set(id), R.assoc('Title', title), cache.get);
    return R.ifElse(cache.has, update, gqlError(`Title with id ${id} does not exists`))(id);
};

export const createTitle = (root:any, args: { [key:string]: any }) => R.compose(
    R.chain(cache.set, R.prop('imdbID')),
    R.assoc('Type', 'movie'),
    R.prop('title')
)(args);
