/* @flow */

declare interface ImdbData {
  id: string,
  type: string
};

declare interface Film {
  title: string,
  year: string,
  info: string
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
  imdbRating: string,
  imdbVotes: string,
  imdbId: string,
  Type: string
};

declare interface JSONObject { [key:string]: mixed };
declare type RequestOptions = { [key:string]: string|bool };
