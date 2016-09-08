/* @flow */

import { curry } from 'ramda';
import rp from 'request-promise';

export const request    = curry((opts: JSONObject): Promise<JSONObject> => rp(opts));
export const promiseAll = curry((arr: [Promise<any>]): Promise<any> => Promise.all(arr));
