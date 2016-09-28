/* @flow */

import { trace } from '../../utils/curry';
import { formatDate } from '../../utils/date';
import { firstN } from '../../utils/collection';
import { stripParenthesis } from '../../utils/string';
import { searchTerms, searchById } from '../../services/imdbService';

import { map, prop, path, compose, split, curry, flatten, filter, any, equals, trim,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const omdbDateFormat    = "DD MMM YYYY";
const strToArray        = (str: string): [string] => compose(map(trim), split(','))(str);
const getAllMatches     = (data: [ImdbTermResultData]): ?[[JSONObject]] => map(path(['results', 'names']))(data);
const getExactMatch     = curry((rawValues: [string], matches: any): [string] => filter((v) => any(equals(v.title))(rawValues))(matches));
/* $FlowIgnore: there seems to be a bug in the declaration of the intersection - code works fine */
const getExactMatchId   = curry((rawValues: [string], imdbResults: [ImdbTermResultData]): string => compose(map(prop('id')), getExactMatch(rawValues), flatten, getAllMatches)(imdbResults));
const searchPeople      = curry((toSearch: [string]): Promise<[ImdbPersonData]> => composeP(map(searchById), getExactMatchId(toSearch), searchTerms)(toSearch));

export const Genre      = ({ Genre }: OmdbTitleResultData): [string] => strToArray(Genre);
export const Writer     = ({ Writer }: OmdbTitleResultData): [string] => strToArray(Writer); //compose(searchPeople, map(stripParenthesis), split(','))(Writer);
export const Director   = ({ Director }: OmdbTitleResultData): [string] => strToArray(Director); //compose(searchPeople, split(','))(Director);
export const Actors     = ({ Actors }: OmdbTitleResultData): [string] => strToArray(Actors); //compose(searchPeople, firstN(first), split(','))(Actors);
export const Released   = ({ Released }: OmdbTitleResultData, { format }: any): string => formatDate(Released, omdbDateFormat, format || omdbDateFormat);
