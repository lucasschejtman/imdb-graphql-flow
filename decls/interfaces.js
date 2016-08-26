/* @flow */

import { Film } from '../graphql/types';

declare interface ImdbData {
  id: string,
  type: string
};

declare interface ImdbTitleData extends ImdbData {
  cast: [string]
};

declare interface ImdbPersonData extends ImdbData {
  title: string,
  filmography: [Film] //change to Film
};

declare interface ImdbTermResultData {
  results: {
    names: [ImdbPersonData]
  }
};

declare interface JSONObject { [key:string]: mixed };
