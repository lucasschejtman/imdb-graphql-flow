/* @flow */

import * as TitleResolver from './resolvers/titleResolver';
import * as PersonResolver from './resolvers/personResolver';

import { cond, equals, always } from 'ramda';
import { GraphQLInt, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';

const SearchableResolver = ({ type }: ImdbData): GraphQLObjectType => {
  const resolver = cond([
    [equals('title'), always(Title)],
    [equals('name'), always(Person)]
  ]);
  return resolver(type);
};

export const Searchable = new GraphQLInterfaceType({
  name: 'Searchable',
  fields: {
    id:   { type: GraphQLString },
    type: { type: GraphQLString }
  },
  resolveType: SearchableResolver
});

export const Film = new GraphQLObjectType({
  name: 'Film',
  fields: {
    title:  { type: GraphQLString },
    year:   { type: GraphQLString },
    info:   { type: GraphQLString }
  }
});

export const Person = new GraphQLObjectType({
  name: 'Person',
  interfaces: [Searchable],
  fields: {
    id:           { type: GraphQLString, resolve: PersonResolver.id },
    type:         { type: GraphQLString, resolve: PersonResolver.type },
    title:        { type: GraphQLString, resolve: PersonResolver.title },
    description:  { type: GraphQLString, resolve: PersonResolver.description },
    image:        { type: GraphQLString, resolve: PersonResolver.image },
    mediaLinks:   { type: new GraphQLList(GraphQLString), resolve: PersonResolver.mediaLinks },
    occupation:   { type: new GraphQLList(GraphQLString), resolve: PersonResolver.occupation },
    filmography:  { type: new GraphQLList(Film), resolve: PersonResolver.filmography, args: { first: { type: GraphQLInt } } }
  }
});

export const Title = new GraphQLObjectType({
  name: 'Title',
  interfaces: [Searchable],
  fields: {
    id:         { type: GraphQLString, resolve: TitleResolver.id },
    type:       { type: GraphQLString, resolve: TitleResolver.type },
    rating:     { type: GraphQLString, resolve: TitleResolver.rating },
    votes:      { type: GraphQLString, resolve: TitleResolver.votes },
    metascore:  { type: GraphQLString, resolve: TitleResolver.metascore },
    genres:     { type: new GraphQLList(GraphQLString), resolve: TitleResolver.genres },
    duration:   { type: GraphQLString, resolve: TitleResolver.duration },
    released:   { type: GraphQLString, resolve: TitleResolver.released },
    cast:       { type: new GraphQLList(Person), resolve: TitleResolver.cast, args: { first: { type: new GraphQLNonNull(GraphQLInt) } } }
  }
});
