/* @flow */

import Person from './personObject';
import { DateFormats } from '../enums';
import ITitle from '../interfaces/titleInterface';
import * as TitleResolver from '../resolvers/titleResolver';

import { always } from 'ramda';
import { GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLObjectType } from 'graphql';

const Title = new GraphQLObjectType({
  name: 'Title',
  interfaces: [ITitle],
  fields: {
    id:         { type: GraphQLString},
    type:       { type: GraphQLString },
    image:      { type: GraphQLString },
    duration:   { type: GraphQLString },
    genres:     { type: new GraphQLList(GraphQLString) },
    rated:      { type: GraphQLString, resolve: TitleResolver.rated },
    votes:      { type: GraphQLString, resolve: TitleResolver.votes },
    rating:     { type: GraphQLString, resolve: TitleResolver.rating },
    language:   { type: GraphQLString, resolve: TitleResolver.language },
    metascore:  { type: GraphQLString, resolve: TitleResolver.metascore },
    director:   { type: new GraphQLList(Person), resolve: TitleResolver.director },
    released:   { type: GraphQLString, args: { format: { type: DateFormats } }, resolve: TitleResolver.released },
    cast:       { type: new GraphQLList(Person), args: { first: { type: new GraphQLNonNull(GraphQLInt) } }, resolve: TitleResolver.cast }
  },
  isTypeOf: always(ITitle)
});

export default Title;
