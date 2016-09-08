/* @flow */

import { Person, Title, ISearchable } from './objects';
import * as SchemaResolver from './resolvers/schemaResolver';

import { GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLString } from 'graphql';

const schema: GraphQLSchema = new GraphQLSchema({
  types: [Title, Person, ISearchable],
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      search: { type: ISearchable, resolve: SchemaResolver.search, args: { id: { type: new GraphQLNonNull(GraphQLString) } } }
    }
  })
});

export default schema;
