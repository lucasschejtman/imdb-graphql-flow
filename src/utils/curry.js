/* @flow */

import request from 'request';
import { tap, always } from 'ramda';
import Future from 'fluture';

export const trace      = (msg: string): * => tap(x => console.log(msg, x));
export const gqlError   = (err: string): () => Promise<Error> => always(Promise.reject(new Error(err)));
export const fetch      = (opts: JSONObject): Future<any> => Future((rej, res) => void request(opts, (err, response, body) => {
    if(err) return rej(err);
    return res(body);
}));
