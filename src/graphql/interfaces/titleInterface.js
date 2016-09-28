/* @flow */

import { DateFormats } from '../enums';
import IPerson from './personInterface';

import { GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInterfaceType } from 'graphql';

const ITitle = new GraphQLInterfaceType({
  name: 'ITitle',
  fields: {
    Type:       { type: GraphQLString },
    Year:       { type: GraphQLString },
    Genre:      { type: new GraphQLList(GraphQLString) },
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
    Writer:     { type: new GraphQLList(IPerson) },
    Director:   { type: new GraphQLList(IPerson) },
    Released:   { type: GraphQLString, args: { format: { type: DateFormats } } },
    Actors:     { type: new GraphQLList(IPerson), args: { first: { type: new GraphQLNonNull(GraphQLInt) } } }
  }
});

export default ITitle;
