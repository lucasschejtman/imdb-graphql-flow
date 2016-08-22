/* @flow */

import {
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

const searchableProps = {
  id: {
    type: GraphQLString,
    resolve: (data: ImdbData): string => data.id
  },
  type: {
    type: GraphQLString,
    resolve: (data: ImdbData): string => data.type
  }
};

const SearchableResolver = (data: ImdbData) : GraphQLObjectType => {
  const type = data.type;
  switch(type) {
    case 'title':
    return Title;
    case 'name':
    return Person;
  }
};

export const Searchable = new GraphQLInterfaceType({
  name: 'Searchable',
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString }
  },
  resolveType: SearchableResolver
});

export const Film = new GraphQLObjectType({
  name: 'Film',
  fields: {
    title: { type: GraphQLString },
    year: { type: GraphQLString },
    info: { type: GraphQLString }
  }
});

export const Title = new GraphQLObjectType({
  name: 'Title',
  interfaces: [Searchable],
  fields: {
    ...searchableProps,
    cast: {
      type: new GraphQLList(GraphQLString),
      args: {
        first: {
          type: GraphQLInt
        }
      },
      resolve: (data: ImdbTitleData, { first }: any): [string] => {
        const cast: [string] = data.cast;
        return cast.slice(0, first || cast.length);
      }
    }
  },
});

export const Person = new GraphQLObjectType({
  name: 'Person',
  interfaces: [Searchable],
  fields: {
    ...searchableProps,
    filmography: {
      type: new GraphQLList(Film),
      args: {
        first: {
          type: GraphQLInt
        }
      },
      resolve: (data: ImdbPersonData, { first }: any): [Film] => {
        const filmography = data.filmography;
        return filmography.slice(0, first || filmography.length);
      }
    }
  },
});
