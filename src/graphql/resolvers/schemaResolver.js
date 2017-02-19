/* @flow */

import { trace } from '../../utils/curry';
import * as cache from '../../utils/cache';
import { startsWith } from '../../utils/string';
import { searchById, searchOmdb } from '../../services/imdbService';

import { compose, trim, ifElse, when, assoc } from 'ramda';

const isTitle         = (id: string): bool => startsWith('tt')(id);
// Unfortunately the GraphQL driver expect a promise
const searchPerson    = (id: string): Promise<OmdbTitleResultData> => searchById(id).promise().then(cache.set(id)).catch(console.log);
const searchTitle     = (id: string): Promise<OmdbTitleResultData> => searchOmdb(id).promise().then(cache.set(id)).catch(console.log);
const searchResource  = (id: string): Promise<OmdbTitleResultData|ImdbPersonData> => ifElse(isTitle, searchTitle, searchPerson)(id);
const fromCacheOrApi  = (id: string): Promise<OmdbTitleResultData|ImdbPersonData> => ifElse(cache.has, cache.get, searchResource)(id);

export const search   = (root: any, { id }: any): Promise<OmdbTitleResultData|ImdbPersonData> => compose(fromCacheOrApi, trim)(id);

// test save
export const updateTitle = (root: any, { id, title }: any) => when(cache.has, compose(cache.set(id), assoc('Title', title), cache.get))(id);
