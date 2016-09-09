/* @flow */

import { searchById } from '../../services/imdbService';

import { compose, trim } from 'ramda';

//TODO: create searchPerson and searchTitle
export const search = (root: any, { id }: any): Promise<JSONObject> => compose(searchById, trim)(id);
