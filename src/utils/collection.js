import { take, Infinity } from 'ramda';

export const firstN = (n: ?number, arr: [any]): [any] => take(n || Infinity, arr);
