/* @flow */

import { firstN } from '../../utils/collection';
import { getFilmCast, searchById, searchOmdb } from '../../services/imdbService';

import { map, prop, path, head, compose,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

const filmCast        = (data: ImdbTermResultData): ?[string] => path(['results', 'names'])(data);
const mapIds          = (arr: [{ [key:string]: string }]): [string] => map(prop('id'))(arr);
  /* $FlowIgnore: there seems to be a bug in the declaration of the intersection - code works fine */
const getFirstCastId  = (imdbResult: ImdbTermResultData): string => compose(head, mapIds, filmCast)(imdbResult);

export const id         = ({ id }: ImdbData): string => id;
export const type       = ({ type }: ImdbData): string => type;
export const genres     = ({ genres }: ImdbTitleData): [string] => genres;
export const duration   = ({ duration }: ImdbTitleData): string => duration;
export const released   = ({ released }: ImdbTitleData): string => released;
export const votes      = ({ id }: ImdbTitleData): Promise<string> => composeP(prop('imdbVotes'), searchOmdb)(id);
export const metascore  = ({ id }: ImdbTitleData): Promise<string> => composeP(prop('Metascore'), searchOmdb)(id);
export const rating     = ({ id }: ImdbTitleData): Promise<string> => composeP(prop('imdbRating'), searchOmdb)(id);

// Signature should be - bottom line - but due to circular reference changed to mixed.
// Maybe change to a flow person declaration better instead of object literal ?
// cast :: ImdbTitleData -> any -> [Person]
export const cast = ({ cast }: ImdbTitleData, { first }: any): Promise<[mixed]> => {
  const toSearch: [string] = firstN(first, cast);
  return composeP(map(searchById), map(getFirstCastId), getFilmCast)(toSearch);
};
