/* @flow */

import { formatDate } from '../../utils/date';
import { firstN } from '../../utils/collection';
import { getFilmCast, searchById, searchOmdb } from '../../services/imdbService';

import { map, prop, path, head, compose,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const filmCast        = (data: ImdbTermResultData): ?[string] => path(['results', 'names'])(data);
const mapIds          = (arr: [{ [key:string]: string }]): [string] => map(prop('id'))(arr);
/* $FlowIgnore: there seems to be a bug in the declaration of the intersection - code works fine */
const getFirstCastId  = (imdbResult: ImdbTermResultData): string => compose(head, mapIds, filmCast)(imdbResult);

export const released   = ({ released }: ImdbTitleData, { format }: any): string => formatDate(released, format);
export const votes      = ({ id }: ImdbTitleData): Promise<string> => composeP(prop('imdbVotes'), searchOmdb)(id);
export const metascore  = ({ id }: ImdbTitleData): Promise<string> => composeP(prop('Metascore'), searchOmdb)(id);
export const rating     = ({ id }: ImdbTitleData): Promise<string> => composeP(prop('imdbRating'), searchOmdb)(id);
export const cast       = ({ cast }: ImdbTitleData, { first }: any): Promise<[ImdbPersonData]> => {
  const toSearch: [string] = firstN(first, cast);
  return composeP(map(searchById), map(getFirstCastId), getFilmCast)(toSearch);
};
