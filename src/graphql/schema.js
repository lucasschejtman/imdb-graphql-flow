/* @flow */

import TitleType from './interfaces/titleInterface';
import Movie from './objects/movieObject';
import Series from './objects/seriesObject';
import Episode from './objects/episodeObject';
import Person from './objects/personObject';
import * as SchemaResolver from './resolvers/schemaResolver';

import { GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLList } from 'graphql';

const schema: GraphQLSchema = new GraphQLSchema({
  types: [Movie, Series, Episode, TitleType, Person],
  query: new GraphQLObjectType({
    name: 'ImdbRootQuery',
    fields: {
      Title: { type: TitleType, resolve: SchemaResolver.search, args: { id: { type: new GraphQLNonNull(GraphQLString) } } },
      Person: { type: Person, resolve: SchemaResolver.search, args: { id: { type: new GraphQLNonNull(GraphQLString) } } }
    }
  })
});

export default schema;
