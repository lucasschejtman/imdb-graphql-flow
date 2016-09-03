/* @flow */

import { getFilmCast, searchById, searchOmdb } from '../services/imdbService';

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
    resolve: (data: ImdbData): string => data.id
  },
  type: {
    type: GraphQLString,
    resolve: (data: ImdbData): string => data.type
  }
};

const SearchableResolver = (data: ImdbData) : GraphQLObjectType => {
  const resolver = cond([[equals('title'), always(Title)], [equals('name'), always(Person)]]);
  return compose(resolver, prop('type'))(data);
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
    image: {
      type: GraphQLString,
      resolve: (data: ImdbPersonData): string => data.image
    },
    mediaLinks: {
      type: new GraphQLList(GraphQLString),
      resolve: (data: ImdbPersonData): [string] => data.mediaLinks
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
    rating: {
      type: GraphQLString,
      resolve: ({ id }: ImdbTitleData): Promise<string> => composeP(prop('imdbRating'), searchOmdb)(id)
    },
    cast: {
      type: new GraphQLList(Person),
      args: {
        first: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (data: ImdbTitleData, { first }: any): Promise<[Person]> => {
        const toSearch: [string] = data.cast.slice(0, first);
        // beginning of refactor
        //const cast: Promise<[ImdbTermResultData]> = composeP(getFilmCast)(toSearch);
        const cast: Promise<[ImdbTermResultData]> = getFilmCast(toSearch)
          .then(c => c.map((cst: ImdbTermResultData) => cst.results.names[0].id))
          .then(c => c.map(searchById));
        return cast;
      }
    }
  },
});
