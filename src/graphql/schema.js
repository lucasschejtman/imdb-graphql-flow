/* @flow */

import Title from './objects/titleObject';
import Person from './objects/personObject';
import * as SchemaResolver from './resolvers/schemaResolver';

import { GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLString } from 'graphql';

const schema: GraphQLSchema = new GraphQLSchema({
  types: [Title, Person],
  query: new GraphQLObjectType({
    name: 'ImdbRootQuery',
    fields: {
      Title: { type: Title, resolve: SchemaResolver.search, args: { id: { type: new GraphQLNonNull(GraphQLString) } } },
      Person: { type: Person, resolve: SchemaResolver.search, args: { id: { type: new GraphQLNonNull(GraphQLString) } } }
    }
  })
});

export default schema;
