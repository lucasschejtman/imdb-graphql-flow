/* @flow */

import { getFilmCast, searchById } from '../services/imdbService';

import {
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
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

export const Person = new GraphQLObjectType({
  name: 'Person',
  interfaces: [Searchable],
  fields: {
    ...searchableProps,
    title: {
      type: GraphQLString,
      resolve: (data: ImdbPersonData): string => data.title
    },
    description: {
      type: GraphQLString,
      resolve: (data: ImdbPersonData): string => data.description
    },
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
    },
    occupation: {
      type: new GraphQLList(GraphQLString),
      resolve: (data: ImdbPersonData): [string] => data.occupation
    }
  },
});

export const Title = new GraphQLObjectType({
  name: 'Title',
  interfaces: [Searchable],
  fields: {
    ...searchableProps,
    cast: {
      type: new GraphQLList(Person),
      args: {
        first: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (data: ImdbTitleData, { first }: any): Promise<[Person]> => {
        const toSearch: [string] = data.cast.slice(0, first);
        const cast: Promise<[ImdbTermResultData]> = getFilmCast(toSearch)
          .then(c => c.map((cst: ImdbTermResultData) => cst.results.names[0].id))
          .then(c => c.map(searchById));
        return cast;
      }
    }
  },
});
