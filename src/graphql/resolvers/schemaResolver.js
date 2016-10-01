/* @flow */

import * as cache from '../../utils/cache';
import { searchById, searchOmdb } from '../../services/imdbService';

import { compose, trim, ifElse, take, equals,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const isTitle         = (id: string): bool => compose(equals('tt'), take(2))(id);
const searchPerson    = (id: string): Promise<ImdbPersonData> => composeP(cache.set(id), searchById)(id);
const searchTitle     = (id: string): Promise<OmdbTitleResultData> => composeP(cache.set(id), searchOmdb)(id);
const searchResource  = (id: string): Promise<OmdbTitleResultData|ImdbPersonData> => ifElse(isTitle, searchTitle, searchPerson)(id);
const fromCacheOrApi  = (id: string): Promise<OmdbTitleResultData|ImdbPersonData> => ifElse(cache.has, cache.get, searchResource)(id);

export const search   = (root: any, { id }: any): Promise<OmdbTitleResultData|ImdbPersonData> => compose(fromCacheOrApi, trim)(id);
