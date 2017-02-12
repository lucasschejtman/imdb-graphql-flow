/* @flow */

import request from 'request';
import rp from 'request-promise';
import { tap, curry } from 'ramda';
import { Future } from 'ramda-fantasy';

export const trace      = (msg: string): * => tap(x => console.log(msg, x));
//export const request    = curry((opts: JSONObject): Promise<JSONObject> => rp(opts));
export const resolve    = curry((resolved: any): Promise<any> => Promise.resolve(resolved));
export const promiseAll = curry((arr: [Promise<any>]): Promise<any> => Promise.all(arr));
export const fetch      = (opts: JSONObject): Future<any> => new Future((rej, res) => request(opts, (err, response, body) => {
    if(err) return rej(err);
    return res(body);
}));
export const parseJSON = (str: string): Future<JSONObject> => {
    return new Future((rej, res) => {
        try {
            res(JSON.parse(str));
        } catch (err) {
            rej({ error: 'json parse error' });
        }
    });
};
