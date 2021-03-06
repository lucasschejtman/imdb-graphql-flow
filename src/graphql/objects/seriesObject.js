/* @flow */

import Episode from './episodeObject';
import { DateFormats } from '../enums';
import TitleType from '../interfaces/titleInterface';
import * as TitleResolver from '../resolvers/titleResolver';
import * as SeriesResolver from '../resolvers/seriesResolver';

import { GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectType } from 'graphql';

const Series = new GraphQLObjectType({
  name: 'Series',
  interfaces: [TitleType],
  fields: {
    Type:         { type: GraphQLString },
    Year:         { type: GraphQLString },
    Title:        { type: GraphQLString },
    Rated:        { type: GraphQLString },
    Awards:       { type: GraphQLString },
    imdbID:       { type: GraphQLString },
    Poster:       { type: GraphQLString },
    Runtime:      { type: GraphQLString },
    Country:      { type: GraphQLString },
    Language:     { type: GraphQLString },
    Metascore:    { type: GraphQLString },
    imdbVotes:    { type: GraphQLString },
    imdbRating:   { type: GraphQLString },
    totalSeasons: { type: GraphQLString },
    Genre:        { type: new GraphQLList(GraphQLString), resolve: TitleResolver.Genre },
    Writer:       { type: new GraphQLList(GraphQLString), resolve: TitleResolver.Writer },
    Actors:       { type: new GraphQLList(GraphQLString), resolve: TitleResolver.Actors },
    Director:     { type: new GraphQLList(GraphQLString), resolve: TitleResolver.Director },
    Released:     { type: GraphQLString, args: { format: { type: DateFormats } }, resolve: TitleResolver.Released },
    Episodes:     { type: new GraphQLList(Episode), args: { fromSeason: { type: GraphQLInt } }, resolve: SeriesResolver.Season }
  },
  isTypeOf: TitleResolver.Type('series')
});

export default Series;
