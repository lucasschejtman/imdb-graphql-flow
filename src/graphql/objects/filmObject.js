/* @flow */

import { DateFormats } from '../enums';
import IFilm from '../interfaces/filmInterface';
import * as FilmResolver from '../resolvers/filmResolver';

import { always } from 'ramda';
import { GraphQLString, GraphQLObjectType } from 'graphql';

const Film = new GraphQLObjectType({
  name: 'Film',
  interfaces: [IFilm],
  fields: {
    title:  { type: GraphQLString },
    info:   { type: GraphQLString },
    year:   { type: GraphQLString, resolve: FilmResolver.year, args: { format: { type: DateFormats } } }
  },
  isTypeOf: always(IFilm)
});

export default Film;
