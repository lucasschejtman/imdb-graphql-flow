/* @flow */

import { formatDate } from '../../utils/date';

import { map, compose, split, trim } from 'ramda';

const omdbDateFormat    = "DD MMM YYYY";
const strToArray        = (str: string): [string] => compose(map(trim), split(','))(str);

export const Genre      = ({ Genre }: OmdbTitleResultData): [string] => strToArray(Genre);
export const Writer     = ({ Writer }: OmdbTitleResultData): [string] => strToArray(Writer);
export const Director   = ({ Director }: OmdbTitleResultData): [string] => strToArray(Director);
export const Actors     = ({ Actors }: OmdbTitleResultData): [string] => strToArray(Actors);
export const Released   = ({ Released }: OmdbTitleResultData, { format }: { [key:string]:string }): string => formatDate(Released, omdbDateFormat, format || omdbDateFormat);
