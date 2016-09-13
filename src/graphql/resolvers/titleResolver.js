/* @flow */

import { formatDate } from '../../utils/date';
import { firstN } from '../../utils/collection';
import { getFilmCast, searchById } from '../../services/imdbService';

import { map, prop, path, head, compose, split,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const strToArr        = split(',');
const filmCast        = (data: ImdbTermResultData): ?[string] => path(['results', 'names'])(data);
const mapIds          = (arr: [{ [key:string]: string }]): [string] => map(prop('id'))(arr);
/* $FlowIgnore: there seems to be a bug in the declaration of the intersection - code works fine */
const getFirstCastId  = (imdbResult: ImdbTermResultData): string => compose(head, mapIds, filmCast)(imdbResult);

export const rated      = ({ Rated }: ImdbMergedTitleData): string => Rated;
export const language   = ({ Language }: ImdbMergedTitleData): string => Language;
export const votes      = ({ imdbVotes }: ImdbMergedTitleData): string => imdbVotes;
export const metascore  = ({ Metascore }: ImdbMergedTitleData): string => Metascore;
export const rating     = ({ imdbRating }: ImdbMergedTitleData): string => imdbRating;
export const director   = ({ Director }: ImdbMergedTitleData): [string] => strToArr(Director);
export const released   = ({ released }: ImdbMergedTitleData, { format }: any): string => formatDate(released, format);
export const cast       = ({ cast }: ImdbMergedTitleData, { first }: any): Promise<[ImdbPersonData]> => {
  const toSearch: [string] = firstN(first, cast);
  return composeP(map(searchById), map(getFirstCastId), getFilmCast)(toSearch);
};
