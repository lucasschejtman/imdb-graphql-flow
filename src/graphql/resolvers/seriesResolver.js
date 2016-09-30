/* @flow */

import { searchSeason } from '../../services/imdbService';

export const Season = ({ imdbID }: OmdbTitleResultData, { fromSeason }: { [key:string]: number }) => searchSeason(imdbID, fromSeason);
