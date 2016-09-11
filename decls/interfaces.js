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

declare interface ImdbTitleData extends ImdbData {
  genres: [string],
  cast: [string],
  duration: string,
  released: string,
  image: string
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

//TODO: see how can I extend multiple interfaces
declare interface ImdbMergedTitleData {
  id: string,
  type: string,
  genres: [string],
  cast: [string],
  duration: string,
  released: string,
  image: string,
  Title: string,
  Released: string,
  Year: string,     // Not implemented
  Rated: string,
  Runtime: string,
  Genre: string,
  Director: string, // Not implemented
  Writer: string,   // Not implemented
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,  // Not implemented
  Awards: String,   // Not implemented
  Poster: string,
  Metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbId: string,
  Type: string
};
