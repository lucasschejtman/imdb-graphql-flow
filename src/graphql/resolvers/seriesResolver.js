/* @flow */

import { searchSeason } from '../../services/imdbService';

import { clamp, identity } from 'ramda';

export const Season = ({ imdbID, totalSeasons }: OmdbSeasonResultData, { fromSeason }: { [key:string]: number }) =>
    searchSeason(imdbID, clamp(1, parseInt(totalSeasons), fromSeason)).promise().catch(console.log).then(identity);
