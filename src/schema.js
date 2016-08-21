/* @flow */

import rp from 'request-promise';
import {
  GraphQLInt,
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

interface imdbData {
  id: string,
  type: string
};

interface imdbTitleData extends imdbData {
  cast: [string]
};

interface imdbPersonData extends imdbData {
  filmography: [FilmType]
};

type imdbType = { data: imdbData };
type imdbTitleType = { data: imdbTitleData };
type imdbPersonType = { data: imdbPersonData };

type JSONObject = { [key:string]: mixed };

const searchableProps = {
  id: {
    type: GraphQLString,
    resolve: (root: imdbType): string => root.data.id
  },
  type: {
    type: GraphQLString,
    resolve: (root: imdbType): string => root.data.type
  }
};

const getType = (id: string) : Promise<string> => rp(`http://imdb.wemakesites.net/api/${id}`).then(res => res);

const resolveType = (root: imdbType) : GraphQLObjectType => {
  const type = root.data.type;
  switch(type) {
    case 'title':
    return TitleType;
    case 'name':
    return PersonType;
  }
};

const SearchableType = new GraphQLInterfaceType({
  name: 'Searchable',
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString }
  },
  resolveType: resolveType
});

const TitleType = new GraphQLObjectType({
  name: 'Title',
  interfaces: [SearchableType],
  fields: {
    ...searchableProps,
    cast: {
      type: new GraphQLList(GraphQLString),
      args: {
        first: {
          type: GraphQLInt
        }
      },
      resolve: (root: imdbTitleType, { first }: any): [string] => {
        const cast = root.data.cast;
        return cast.slice(0, first || cast.length);
      }
    }
  },
});

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: {
    title: { type: GraphQLString },
    year: { type: GraphQLString },
    info: { type: GraphQLString }
  }
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  interfaces: [SearchableType],
  fields: {
    ...searchableProps,
    filmography: {
      type: new GraphQLList(FilmType),
      args: {
        first: {
          type: GraphQLInt
        }
      },
      resolve: (root: imdbPersonType, { first }: any): [FilmType] => {
        const filmography = root.data.filmography;
        return filmography.slice(0, first || filmography.length);
      }
    }
  },
});

const schema = new GraphQLSchema({
  types: [TitleType, PersonType, SearchableType],
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      search: {
        type: SearchableType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, { id }): Promise<JSONObject> => getType(id).then(JSON.parse)
      }
    }
  })
});

export default schema;
