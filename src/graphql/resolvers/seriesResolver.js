/* @flow */

import { searchSeason } from '../../services/imdbService';

import { clamp, compose } from 'ramda';

/* $FlowIgnore: intersection bug? */
export const Season = ({ imdbID, totalSeasons }: OmdbSeasonResultData, { fromSeason }: { [key:string]: number }) => compose(searchSeason(imdbID), clamp(1, parseInt(totalSeasons)))(fromSeason);
