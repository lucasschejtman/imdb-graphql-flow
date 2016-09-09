/* @flow */

import { promiseAll } from '../../utils/curry';
import { searchById, searchOmdb } from '../../services/imdbService';

import { compose, trim, ifElse, take, equals, mergeAll,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const isTitle = (id: string): bool => compose(equals('tt'), take(2))(id);
const ifTitle = ifElse(isTitle);
const searchTitle = (id: string): Promise<ImdbMergedTitleData> => composeP(mergeAll, promiseAll)([searchById(id), searchOmdb(id)]);

export const search = (root: any, { id }: any): Promise<mixed> => compose(ifTitle(searchTitle, searchById), trim)(id);
