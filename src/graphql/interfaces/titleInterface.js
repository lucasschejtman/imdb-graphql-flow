/* @flow */

import { DateFormats } from '../enums';
import IPerson from './personInterface';

import { GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInterfaceType } from 'graphql';

const ITitle = new GraphQLInterfaceType({
  name: 'ITitle',
  fields: {
    id:         { type: GraphQLString },
    type:       { type: GraphQLString },
    votes:      { type: GraphQLString },
    image:      { type: GraphQLString },
    rating:     { type: GraphQLString },
    duration:   { type: GraphQLString },
    released:   { type: GraphQLString, args: { format: { type: DateFormats } }  },
    metascore:  { type: GraphQLString },
    genres:     { type: new GraphQLList(GraphQLString) },
    cast:       { type: new GraphQLList(IPerson), args: { first: { type: new GraphQLNonNull(GraphQLInt) } } }
  }
});

export default ITitle;
