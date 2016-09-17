/* @flow */

import { compose, trim, replace } from 'ramda';

export const stripParenthesis = (str: string): string => compose(trim, replace(/\(([^}]+)\)/, ''))(str);
