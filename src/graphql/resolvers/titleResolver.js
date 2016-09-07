/* @flow */

import { firstN } from '../../utils/collection';
import { getFilmCast, searchById, searchOmdb, getFirstCastId } from '../../services/imdbService';

import { map, prop,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';

export const id = ({ id }: ImdbData): string => id;

export const type = ({ type }: ImdbData): string => type;

export const rating = ({ id }: ImdbTitleData): Promise<string> => composeP(prop('imdbRating'), searchOmdb)(id);

export const votes = ({ id }: ImdbTitleData): Promise<string> => composeP(prop('imdbVotes'), searchOmdb)(id);

export const metascore = ({ id }: ImdbTitleData): Promise<string> => composeP(prop('Metascore'), searchOmdb)(id);

export const genres = ({ genres }: ImdbTitleData): [string] => genres;

export const duration = ({ duration }: ImdbTitleData): string => duration;

export const released = ({ released }: ImdbTitleData): string => released;

// Signature should be - bottom line - but due to circular reference changed to mixed.
// Maybe change to a flow person declaration better instead of object literal ?
// cast:: ImdbTitleData -> any -> [Person]
export const cast = ({ cast }: ImdbTitleData, { first }: any): Promise<[mixed]> => {
  const toSearch: [string] = firstN(first, cast);
  return composeP(map(searchById), map(getFirstCastId), getFilmCast)(toSearch);
};
