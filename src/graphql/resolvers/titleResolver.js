/* @flow */

import { formatDate } from '../../utils/date';

import { fromNullable } from 'data.maybe';
import { map, compose, split, trim, propEq } from 'ramda';

const omdbDateFormat    = "DD MMM YYYY";
const strToArray        = (str: string): [string] => compose(map(trim), split(','))(str);

export const Type       = propEq('Type');
export const Title      = ({ Title }: OmdbTitleResultData): string => Title;
export const Genre      = ({ Genre }: OmdbTitleResultData): [string] => fromNullable(Genre).map(strToArray).getOrElse([]);
export const Writer     = ({ Writer }: OmdbTitleResultData): [string] => fromNullable(Writer).map(strToArray).getOrElse([]);
export const Director   = ({ Director }: OmdbTitleResultData): [string] => fromNullable(Director).map(strToArray).getOrElse([]);
export const Actors     = ({ Actors }: OmdbTitleResultData): [string] => fromNullable(Actors).map(strToArray).getOrElse([]);
export const Released   = ({ Released }: OmdbTitleResultData, { format }: { [key:string]:string }): string => formatDate(Released, omdbDateFormat, format || omdbDateFormat);
