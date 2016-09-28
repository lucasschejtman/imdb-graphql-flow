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

export const Genre      = ({ Genre }: OmdbTitleResultData): [string] => split(',')(Genre);
export const Released   = ({ Released }: OmdbTitleResultData, { format }: any): string => formatDate(Released, format);
export const Writer     = ({ Writer }: OmdbTitleResultData): Promise<[ImdbPersonData]> => compose(searchPeople, map(stripParenthesis), split(','))(Writer);
export const Director   = ({ Director }: OmdbTitleResultData): Promise<[ImdbPersonData]> => compose(searchPeople, split(','))(Director);
export const Actors     = ({ Actors }: OmdbTitleResultData, { first }: any): Promise<[ImdbPersonData]> => compose(searchPeople, firstN(first))(Actors);
