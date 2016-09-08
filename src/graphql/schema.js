/* @flow */

import { Person, Title, Searchable } from './objects';
import * as SchemaResolver from './resolvers/schemaResolver';

import { GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLString } from 'graphql';

const schema: GraphQLSchema = new GraphQLSchema({
  types: [Title, Person, Searchable],
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      search: { type: Searchable, resolve: SchemaResolver.search, args: { id: { type: new GraphQLNonNull(GraphQLString) } } }
    }
  })
});

export default schema;
