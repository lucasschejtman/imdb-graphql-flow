/* @flow */

import rp from 'request-promise';
import { tap, curry } from 'ramda';

export const trace      = (msg: any): any => tap(x => console.log(msg, x));
export const request    = curry((opts: JSONObject): Promise<JSONObject> => rp(opts));
export const promiseAll = curry((arr: [Promise<any>]): Promise<any> => Promise.all(arr));
