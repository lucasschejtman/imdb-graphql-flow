
query test {
  search(id:"nm0000115 | tt2488496"){
  	... on Title{
      ...searchableProps,
      rating,
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
      description,
      filmography {
        title
        year
        info
      },
      occupation,
      image,
      mediaLinks
    }
  }
}

fragment searchableProps on Searchable {
 	id,
  type
}
