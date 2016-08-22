query umyeah {
  search(id:"nm0000115 | tt2488496") {
    id,
    type,
    ... on Title {
      cast
    },
    ... on Person {
      filmography {
        info,
        title,
        year
      }
    }
  }
}
