/* @flow */

import * as cache from '../../utils/cache';
import { promiseAll } from '../../utils/curry';
import { searchById, searchOmdb } from '../../services/imdbService';

import { compose, trim, ifElse, take, equals, mergeAll,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const isTitle         = (id: string): bool => compose(equals('tt'), take(2))(id);
const searchPerson    = (id: string): Promise<JSONObject> => composeP(cache.set(id), searchById)(id);
const searchTitle     = (id: string): Promise<ImdbMergedTitleData> => composeP(cache.set(id), mergeAll, promiseAll)([searchById(id), searchOmdb(id)]);
const searchResource  = (id: string): Promise<mixed> => ifElse(isTitle, searchTitle, searchPerson)(id);

export const search = (root: any, { id }: any): Promise<mixed> => compose(ifElse(cache.has, cache.get, searchResource), trim)(id);
