/* @flow */

import { searchById } from '../../services/imdbService';

import { compose, trim, ifElse, take, equals } from 'ramda';

const isTitle = (id: string): bool => compose(equals('tt'), take(2))(id);
const ifTitle = ifElse(isTitle);
//const searchTitle = (id: string): Promise<JSONObject> => id;

//TODO: create searchPerson and searchTitle
export const search = (root: any, { id }: any): Promise<JSONObject> => compose(ifTitle(searchById, searchById), trim)(id);
