/* @flow */

import request from 'request';
import { tap } from 'ramda';
import Future from 'fluture';

export const trace      = (msg: string): * => tap(x => console.log(msg, x));
export const fetch      = (opts: JSONObject): Future<any> => Future((rej, res) => void request(opts, (err, response, body) => {
    if(err) return rej(err);
    console.log(body);
    return res(body);
}));
