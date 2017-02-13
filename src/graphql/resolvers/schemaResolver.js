/* @flow */

import * as cache from '../../utils/cache';
import { searchById, searchOmdb } from '../../services/imdbService';

import { compose, trim, ifElse, take, equals } from 'ramda';

const isTitle         = (id: string): bool => compose(equals('tt'), take(2))(id);
const searchPerson    = (id: string): Future<OmdbTitleResultData> => searchById(id).fork(console.error, cache.set(id));
const searchTitle     = (id: string): Future<OmdbTitleResultData> => searchOmdb(id).fork(console.error, cache.set(id));
const searchResource  = (id: string): Future<OmdbTitleResultData|ImdbPersonData> => ifElse(isTitle, searchTitle, searchPerson)(id);
const fromCacheOrApi  = (id: string): Future<OmdbTitleResultData|ImdbPersonData> => ifElse(cache.has, cache.get, searchResource)(id);

export const search   = (root: any, { id }: any): Future<OmdbTitleResultData|ImdbPersonData> => compose(fromCacheOrApi, trim)(id);
