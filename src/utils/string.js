/* @flow */

import { compose, curry, equals, take, length, trim, replace } from 'ramda';

export const startsWith = curry((withX, target) => compose(equals(withX), take(length(withX)))(target));
export const stripParenthesis = (str: string): string => compose(trim, replace(/\(([^}]+)\)/, ''))(str);
