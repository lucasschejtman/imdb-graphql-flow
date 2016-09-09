/* @flow */

import IFilm from './filmInterface';

import { GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLInterfaceType } from 'graphql';

const IPerson = new GraphQLInterfaceType({
  name: 'IPerson',
  fields: {
    id:           { type: GraphQLString },
    type:         { type: GraphQLString },
    title:        { type: GraphQLString },
    image:        { type: GraphQLString },
    description:  { type: GraphQLString },
    mediaLinks:   { type: new GraphQLList(GraphQLString) },
    occupation:   { type: new GraphQLList(GraphQLString) },
    filmography:  { type: new GraphQLList(IFilm), args: { first: { type: GraphQLInt } } }
  }
});

export default IPerson;
