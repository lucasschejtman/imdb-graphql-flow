/* @flow */

import Title from './objects/titleObject';
import ITitle from './interfaces/titleInterface';
import IPerson from './interfaces/personInterface';
import Person from './objects/personObject';
import * as SchemaResolver from './resolvers/schemaResolver';

import { GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLString } from 'graphql';

//TODO: Can we remove concrete implementation and leave interfaces ??
//TODO: Change to specific resolvers when implemented - see schemaResolver
const schema: GraphQLSchema = new GraphQLSchema({
  types: [ITitle, IPerson],
  query: new GraphQLObjectType({
    name: 'ImdbRootQuery',
    fields: {
      Title: { type: Title, resolve: SchemaResolver.search, args: { id: { type: new GraphQLNonNull(GraphQLString) } } },
      Person: { type: Person, resolve: SchemaResolver.search, args: { id: { type: new GraphQLNonNull(GraphQLString) } } }
    }
  })
});

export default schema;
