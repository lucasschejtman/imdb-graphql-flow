/* @flow */

import { Film } from '../graphql/types';

declare interface ImdbData {
  id: string,
  type: string
};

declare interface ImdbTitleData extends ImdbData {
  rating: string,
  cast: [string]
};

declare interface ImdbPersonData extends ImdbData {
  title: string,
  description: string,
  image: string,
  filmography: [Film],
  occupation: [string],
  mediaLinks: [string]
};

declare interface ImdbTermResultData {
  results: {
    names: [ImdbPersonData]
  }
};

declare interface OmdbTitleResultData {
  Title: string,
  Released: string,
  Year: string,
  Rated: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: String,
  Poster: string,
  Metascore: string,
  ImdbRating: string,
  ImdbVotes: string,
  ImdbId: string,
  Type: string
};

declare interface JSONObject { [key:string]: mixed };
