/* @flow */

import rp from 'request-promise';
import {
  GraphQLInt,
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const getType = (id: string) : Promise<string> => rp(`http://imdb.wemakesites.net/api/${id}`).then(res => res);

const resolveType = (root: string) : GraphQLObjectType => {
  const type = JSON.parse(root).data.type;
  switch(type) {
    case 'title':
    return TitleType;
  }
};

const SearchableType = new GraphQLInterfaceType({
  name: 'Searchable',
  fields: {
    searchById: { type: GraphQLString }
  },
  resolveType: resolveType
});

const TitleType = new GraphQLObjectType({
  name: 'Title',
  interfaces: [SearchableType],
  fields: {
    id: {
      type: GraphQLString,
      resolve: (root: string): string => JSON.parse(root).data.id
    },
    cast: {
      type: new GraphQLList(GraphQLString),
      args: {
        first: {
          type: GraphQLInt
        }
      },
      resolve: (root: string, { first }: any): [string] => {
        const cast = JSON.parse(root).data.cast;
        return cast.slice(0, first || cast.length);
      }
    },
    searchById: {
      type: GraphQLString
    }
  },
});

const schema = new GraphQLSchema({
  types: [TitleType, SearchableType],
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      search: {
        type: SearchableType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, { id }): Promise<string> => getType(id).then(res => res)
      }
    }
  })
});

export default schema;
