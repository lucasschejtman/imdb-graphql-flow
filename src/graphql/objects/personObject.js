/* @flow */

import Film from './filmObject';
import IPerson from '../interfaces/personInterface';
import * as PersonResolver from '../resolvers/personResolver';

import { always } from 'ramda';
import { GraphQLInt, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLInterfaceType } from 'graphql';

const Person = new GraphQLObjectType({
  name: 'Person',
  interfaces: [IPerson],
  fields: {
    id:           { type: GraphQLString },
    type:         { type: GraphQLString },
    image:        { type: GraphQLString },
    description:  { type: GraphQLString },
    mediaLinks:   { type: new GraphQLList(GraphQLString) },
    occupation:   { type: new GraphQLList(GraphQLString) },
    title:        { type: GraphQLString, resolve: PersonResolver.title },
    filmography:  { type: new GraphQLList(Film), args: { first: { type: GraphQLInt } }, resolve: PersonResolver.filmography }
  },
  isTypeOf: always(IPerson)
});

export default Person;
