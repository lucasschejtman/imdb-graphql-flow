/* @flow */

//This file could be a lot better, just keeping simple to just work as a simple cache that doesn't spam the APIs
import lru from 'lru-cache';
import { tap } from 'ramda';

const opts = { max: 1000 };
const cache = new lru(opts);

export const get = (key: string): any => cache.get(key);
export const has = (key: string): bool => cache.has(key);
export const set = (key: string): any => tap(obj => cache.set(key, obj));
