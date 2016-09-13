/* @flow */

import { take, curry,
  /* $FlowIgnore: 'Infinity' not included in declaration */
  Infinity } from 'ramda';

export const firstN = curry((n: ?number, arr: [any]): [any] => take(n || Infinity, arr));
