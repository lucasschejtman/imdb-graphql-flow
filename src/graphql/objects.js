/* @flow */

import { DateFormats } from './enums';
import * as FilmResolver from './resolvers/filmResolver';
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

export const ISearchable = new GraphQLInterfaceType({
  name: 'ISearchable',
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
    info:   { type: GraphQLString },
    year:   { type: GraphQLString, resolve: FilmResolver.year, args: { format: { type: DateFormats } } }
  }
});

export const Person = new GraphQLObjectType({
  name: 'Person',
  interfaces: [ISearchable],
  fields: {
    id:           { type: GraphQLString, resolve: PersonResolver.id },
    type:         { type: GraphQLString, resolve: PersonResolver.type },
    title:        { type: GraphQLString, resolve: PersonResolver.title },
    image:        { type: GraphQLString, resolve: PersonResolver.image },
    description:  { type: GraphQLString, resolve: PersonResolver.description },
    mediaLinks:   { type: new GraphQLList(GraphQLString), resolve: PersonResolver.mediaLinks },
    occupation:   { type: new GraphQLList(GraphQLString), resolve: PersonResolver.occupation },
    filmography:  { type: new GraphQLList(Film), resolve: PersonResolver.filmography, args: { first: { type: GraphQLInt } } }
  }
});

export const Title = new GraphQLObjectType({
  name: 'Title',
  interfaces: [ISearchable],
  fields: {
    id:         { type: GraphQLString, resolve: TitleResolver.id },
    type:       { type: GraphQLString, resolve: TitleResolver.type },
    votes:      { type: GraphQLString, resolve: TitleResolver.votes },
    image:      { type: GraphQLString, resolve: TitleResolver.image },
    rating:     { type: GraphQLString, resolve: TitleResolver.rating },
    duration:   { type: GraphQLString, resolve: TitleResolver.duration },
    released:   { type: GraphQLString, resolve: TitleResolver.released, args: { format: { type: DateFormats } } },
    metascore:  { type: GraphQLString, resolve: TitleResolver.metascore },
    genres:     { type: new GraphQLList(GraphQLString), resolve: TitleResolver.genres },
    cast:       { type: new GraphQLList(Person), resolve: TitleResolver.cast, args: { first: { type: new GraphQLNonNull(GraphQLInt) } } }
  }
});
