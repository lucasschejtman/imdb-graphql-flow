/* @flow */

import { DateFormats } from '../enums';
import ITitle from '../interfaces/titleInterface';
import * as TitleResolver from '../resolvers/titleResolver';

import { always } from 'ramda';
import { GraphQLString, GraphQLList, GraphQLObjectType } from 'graphql';

const Title = new GraphQLObjectType({
  name: 'Title',
  interfaces: [ITitle],
  fields: {
    Type:       { type: GraphQLString },
    Year:       { type: GraphQLString },
    Rated:      { type: GraphQLString },
    Awards:     { type: GraphQLString },
    imdbID:     { type: GraphQLString },
    Poster:     { type: GraphQLString },
    Runtime:    { type: GraphQLString },
    Country:    { type: GraphQLString },
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
  isTypeOf: always(ITitle)
});

export default Title;
