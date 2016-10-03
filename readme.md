IMDB GraphQL API
====================

> GraphQL API for the unofficial IMDB Rest APIs [Omdb](https://www.omdbapi.com) and [IMDb JSON Api](http://imdb.wemakesites.net/)

1. Clone repository `git clone https://github.com/lucasschejtman/imdb-graphql-flow && cd imdb-graphql-flow`
2. Install dependencies `npm install`
3. Run `npm run dev` (or `npm run build` to transpile)
4. Navigate to `http://localhost:3000/graphql` to use graphiql


## Example query

```javascript
{
  Title(id: "tt0944947") {
    ... TitleFragment,

    ... on Movie {
      Released
    },

    ... on Series {
      totalSeasons,
      Episodes(fromSeason: 6) {
        Title,
        Director,
        imdbRating
      }
    },

    ... on Episode {
      Episode
    }
  }
}

fragment TitleFragment on Title
{
  Type,
  Year,
  Title,
  Rated,
  Awards,
  imdbID,
  Poster,
  Runtime,
  Country,
  Language,
  Metascore,
  imdbVotes,
  imdbRating,
  Genre,
  Writer,
  Director,
  Actors,
  Released
}
```
