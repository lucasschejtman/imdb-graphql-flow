/* @flow */

import { firstN } from '../utils/collection';
import { getFilmCast, searchById, searchOmdb, getFirstCastId } from '../services/imdbService';

import { map, prop, cond, compose, equals, always,
  /* $FlowIgnore: 'composeP' not included in declaration */
  composeP } from 'ramda';
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
    resolve: ({ id }: ImdbData): string => id
  },
  type: {
    type: GraphQLString,
    resolve: ({ type }: ImdbData): string => type
  }
};

const SearchableResolver = ({ type }: ImdbData): GraphQLObjectType => {
  const resolver = cond([[equals('title'), always(Title)], [equals('name'), always(Person)]]);
  return resolver(type);
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
      resolve: ({ title }: ImdbPersonData): string => title
    },
    description: {
      type: GraphQLString,
      resolve: ({ description }: ImdbPersonData): string => description
    },
    image: {
      type: GraphQLString,
      resolve: ({ image }: ImdbPersonData): string => image
    },
    mediaLinks: {
      type: new GraphQLList(GraphQLString),
      resolve: ({ mediaLinks }: ImdbPersonData): [string] => mediaLinks
    },
    filmography: {
      type: new GraphQLList(Film),
      args: {
        first: {
          type: GraphQLInt
        }
      },
      resolve: ({ filmography }: ImdbPersonData, { first }: any): [Film] => firstN(first, filmography)
    },
    occupation: {
      type: new GraphQLList(GraphQLString),
      resolve: ({ occupation }: ImdbPersonData): [string] => occupation
    }
  },
});

export const Title = new GraphQLObjectType({
  name: 'Title',
  interfaces: [Searchable],
  fields: {
    ...searchableProps,
    rating: {
      type: GraphQLString,
      resolve: ({ id }: ImdbTitleData): Promise<string> => composeP(prop('imdbRating'), searchOmdb)(id)
    },
    votes: {
      type: GraphQLString,
      resolve: ({ id }: ImdbTitleData): Promise<string> => composeP(prop('imdbVotes'), searchOmdb)(id)
    },
    metascore: {
      type: GraphQLString,
      resolve: ({ id }: ImdbTitleData): Promise<string> => composeP(prop('Metascore'), searchOmdb)(id)
    },
    genres: {
      type: new GraphQLList(GraphQLString),
      resolve: ({ genres }: ImdbTitleData): [string] => genres
    },
    duration: {
      type: GraphQLString,
      resolve: ({ duration }: ImdbTitleData): string => duration
    },
    released: {
      type: GraphQLString,
      resolve: ({ released }: ImdbTitleData): string => released
    },
    cast: {
      type: new GraphQLList(Person),
      args: {
        first: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: ({ cast }: ImdbTitleData, { first }: any): Promise<[Person]> => {
        const toSearch: [string] = firstN(first, cast);
        return composeP(map(searchById), map(getFirstCastId), getFilmCast)(toSearch);
      }
    }
  },
});
