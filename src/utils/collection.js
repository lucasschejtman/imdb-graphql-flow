/* @flow */

import { take,
  /* $FlowIgnore: 'Infinity' not included in declaration */
  Infinity } from 'ramda';

export const firstN = (n: ?number, arr: [any]): [any] => take(n || Infinity, arr);
