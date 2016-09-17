IMDB GraphQl API
====================

> GraphQl API for the unofficial IMDB Rest APIs [Omdb](https://www.omdbapi.com) and [IMDb JSON Api](http://imdb.wemakesites.net/)

1. Clone repository `git clone https://github.com/lucasschejtman/imdb-graphql-flow`
2. Install dependencies `npm install`
3. Run `npm run dev`
4. Navigate to `http://localhost:3000/graphql` to use graphiql


## Example query

```javascript
query Imdb {
  Title(id: "tt2488496") {
    id,
    type,
    votes,
    image,
    awards,
    writer,
    rating,
    duration,
    language,
    writer {
      id,
      title,
      occupation
    },
    director {
      id,
      title,
      occupation
    },
    released(format: DayMonthYearLong),
    metascore,
    genres,
    rated,
    cast(first: 2) {
      id,
      title,
      filmography(first: 2) {
        title,
        info,
        year(format: DayMonthYearShort)
      }
    }
  },
  Person(id: "nm0000115") {
    id,
    type,
    title,
    image,
    description,
    occupation,
    filmography(first: 2) {
      title,
      info,
      year(format: DayMonthYearLong)
    }
  }
}
```
