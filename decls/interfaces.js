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

declare interface JSONObject { [key:string]: mixed };
