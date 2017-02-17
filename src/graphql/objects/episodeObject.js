/* @flow */

import { DateFormats } from '../enums';
import Series from './seriesObject';
import TitleType from '../interfaces/titleInterface';
import * as TitleResolver from '../resolvers/titleResolver';

import { has } from 'ramda';
import { GraphQLString, GraphQLList, GraphQLObjectType } from 'graphql';

const Episode = new GraphQLObjectType({
  name: 'Episode',
  interfaces: [TitleType],
  fields: {
    Type:       { type: GraphQLString },
    Year:       { type: GraphQLString },
    Title:      { type: GraphQLString },
    Rated:      { type: GraphQLString },
    Awards:     { type: GraphQLString },
    imdbID:     { type: GraphQLString },
    Poster:     { type: GraphQLString },
    Season:     { type: GraphQLString },
    Episode:    { type: GraphQLString },
    Runtime:    { type: GraphQLString },
    Country:    { type: GraphQLString },
    seriesID:   { type: GraphQLString },
    Language:   { type: GraphQLString },
    Metascore:  { type: GraphQLString },
    imdbVotes:  { type: GraphQLString },
    imdbRating: { type: GraphQLString },
    Genre:      { type: new GraphQLList(GraphQLString), resolve: TitleResolver.Genre },
    Writer:     { type: new GraphQLList(GraphQLString), resolve: TitleResolver.Writer },
    Actors:     { type: new GraphQLList(GraphQLString), resolve: TitleResolver.Actors },
    Director:   { type: new GraphQLList(GraphQLString), resolve: TitleResolver.Director },
    Released:   { type: GraphQLString, args: { format: { type: DateFormats } }, resolve: TitleResolver.Released }
  },
  // Workaround until Episodes API is back
  // TitleResolver.Type('episode')
  isTypeOf: has('Episode')
});

export default Episode;
