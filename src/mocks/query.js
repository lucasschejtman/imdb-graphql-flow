query Imdb {
  Title(id: "tt2488496") {
    id,
    type,
    votes,
    image,
    rating,
    duration,
    language,
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
