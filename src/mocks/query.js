
query test {
  search(id:"nm0000115 | tt2488496"){
  	... on Title{
      ...searchableProps,
      cast(first: 1) {
        ...searchableProps,
        filmography(first: 2) {
        	title
        	year
        	info
      	}
      }
    }
    ... on Person{
      ...searchableProps,
      title,
      filmography {
        title
        year
        info
      }
    }
  }
}

fragment searchableProps on Searchable {
 	id,
  type
}
