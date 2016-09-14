/* @flow */

import { firstN } from '../../utils/collection';

import { compose, replace, trim } from 'ramda';

export const filmography  = ({ filmography }: ImdbPersonData, { first }: any): [Film] => firstN(first, filmography);
export const title        = ({ title }: ImdbPersonData): string => compose(trim, replace(/["'(I|IV|V)]/g, ''))(title);
