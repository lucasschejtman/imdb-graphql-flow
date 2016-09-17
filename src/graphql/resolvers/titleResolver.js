/* @flow */

import { formatDate } from '../../utils/date';
import { firstN } from '../../utils/collection';
import { stripParenthesis } from '../../utils/string';
import { searchTerms, searchById } from '../../services/imdbService';

import { map, prop, path, compose, split, curry, flatten, filter, any, equals,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const getAllMatches     = (data: [ImdbTermResultData]): ?[[JSONObject]] => map(path(['results', 'names']))(data);
const getExactMatch     = curry((rawValues: [string], matches: any): [string] => filter((v) => any(equals(v.title))(rawValues))(matches));
/* $FlowIgnore: there seems to be a bug in the declaration of the intersection - code works fine */
const getExactMatchId   = curry((rawValues: [string], imdbResults: [ImdbTermResultData]): string => compose(map(prop('id')), getExactMatch(rawValues), flatten, getAllMatches)(imdbResults));
const searchPeople      = curry((toSearch: [string]): Promise<[ImdbPersonData]> => composeP(map(searchById), getExactMatchId(toSearch), searchTerms)(toSearch));

export const rated      = ({ Rated }: ImdbMergedTitleData): string => Rated;
export const awards     = ({ Awards }: ImdbMergedTitleData): string => Awards;
export const country    = ({ Country }: ImdbMergedTitleData): string => Country;
export const language   = ({ Language }: ImdbMergedTitleData): string => Language;
export const votes      = ({ imdbVotes }: ImdbMergedTitleData): string => imdbVotes;
export const metascore  = ({ Metascore }: ImdbMergedTitleData): string => Metascore;
export const rating     = ({ imdbRating }: ImdbMergedTitleData): string => imdbRating;
export const released   = ({ released }: ImdbMergedTitleData, { format }: any): string => formatDate(released, format);
export const writer     = ({ Writer }: ImdbMergedTitleData): Promise<[ImdbPersonData]> => compose(searchPeople, map(stripParenthesis), split(','))(Writer);
export const director   = ({ Director }: ImdbMergedTitleData): Promise<[ImdbPersonData]> => compose(searchPeople, split(','))(Director);
export const cast       = ({ cast }: ImdbMergedTitleData, { first }: any): Promise<[ImdbPersonData]> => compose(searchPeople, firstN(first))(cast);
