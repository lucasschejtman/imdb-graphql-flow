/* @flow */

import { DateFormats } from '../enums';

import { GraphQLString, GraphQLList, GraphQLInterfaceType } from 'graphql';

const TitleType = new GraphQLInterfaceType({
  name: 'Title',
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
    Genre:      { type: new GraphQLList(GraphQLString) },
    Writer:     { type: new GraphQLList(GraphQLString) },
    Director:   { type: new GraphQLList(GraphQLString) },
    Actors:     { type: new GraphQLList(GraphQLString) },
    Released:   { type: GraphQLString, args: { format: { type: DateFormats } } }
  }
});

export default TitleType;
