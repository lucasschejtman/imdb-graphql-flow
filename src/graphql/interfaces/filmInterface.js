/* @flow */

import { DateFormats } from '../enums';

import { GraphQLString, GraphQLInterfaceType } from 'graphql';

const IFilm = new GraphQLInterfaceType({
  name: 'IFilm',
  fields: {
    title:  { type: GraphQLString },
    info:   { type: GraphQLString },
    year:   { type: GraphQLString, args: { format: { type: DateFormats } } }
  }
});

export default IFilm;
