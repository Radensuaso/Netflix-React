const fetchDisplayMovies = async (endPoint) => {
  try {
    const response = await fetch(endPoint, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
      },
    })

    const movies = await response.json()
    console.log(movies)
  } catch (err) {
    console.log(err)
  }
}

//Window onload
window.onload = () => {
  const url = "https://striveschool-api.herokuapp.com/api/movies/Fantasy"

  /* const endPoint = url + genre */
  fetchDisplayMovies(url)
}
