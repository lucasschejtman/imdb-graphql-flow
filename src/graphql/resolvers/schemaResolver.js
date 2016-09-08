/* @flow */

import { searchById } from '../../services/imdbService';

import { compose, trim } from 'ramda';

export const search = (root: any, { id }: any): Promise<JSONObject> => compose(searchById, trim)(id);
