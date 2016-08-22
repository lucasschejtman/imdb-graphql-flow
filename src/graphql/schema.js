/* @flow */

import { Person, Title, Searchable } from './objects';
import { getImdbType } from '../services/imdbService';
import { GraphQLObjectType, GraphQLNonNull, GraphQLSchema, GraphQLString } from 'graphql';

const schema: GraphQLSchema = new GraphQLSchema({
  types: [Title, Person, Searchable],
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      search: {
        type: Searchable,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root: any, { id }: any): Promise<JSONObject> => getImdbType(id)
      }
    }
  })
});

export default schema;
