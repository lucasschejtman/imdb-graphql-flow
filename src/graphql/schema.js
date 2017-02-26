/* @flow */

import TitleType from './interfaces/titleInterface';
import Movie from './objects/movieObject';
import Series from './objects/seriesObject';
import Episode from './objects/episodeObject';
//import Person from './objects/personObject';
import * as SchemaResolver from './resolvers/schemaResolver';

import {
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLSchema as Schema,
  GraphQLString as String,
  GraphQLInputObjectType as InputObjectType
} from 'graphql';

const schema: Schema = new Schema({
  types: [Movie, Series, Episode, TitleType/*, Person*/],
  query: new ObjectType({
    name: 'ImdbRootQuery',
    fields: {
      Title: { type: TitleType, resolve: SchemaResolver.search, args: { id: { type: new NonNull(String) } } },
      //Person: { type: Person, resolve: SchemaResolver.search, args: { id: { type: new NonNull(String) } } }
    }
  }),
  mutation: new ObjectType({
    name: 'ImdbRootMutation',
    fields: {
      createTitle: {
          type: TitleType,
          resolve: SchemaResolver.createTitle,
          args: {
              title: {
                  type: new InputObjectType({
                      name: 'TitleInput',
                      fields: {
                          imdbID: { type: new NonNull(String) },
                          Title: { type: new NonNull(String) },
                          Poster: { type: String }
                      }
                  })
              }
          }
      },
      updateTitle: { type: TitleType, resolve: SchemaResolver.updateTitle, args: { id: { type: new NonNull(String) }, title: { type: new NonNull(String) } } }
    }
  })
});

export default schema;
