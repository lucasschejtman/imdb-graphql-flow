/* @flow */

import { firstN } from '../../utils/collection';

export const filmography  = ({ filmography }: ImdbPersonData, { first }: any): [Film] => firstN(first, filmography);
