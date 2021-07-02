/* // function to check if it's loading

const isLoading = async function (loading) {
  const spinner = document.querySelector(".spinner-grow")
  if (loading) {
    spinner.classList.remove("d-none")
  } else {
    spinner.classList.add("d-none")
  }
} */

//function to generate cols
const generateCol = (movie) => {
  return `<div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-4">
    <a href="../backoffice.html?movieID=${movie._id}&movieCategory=${movie.category}"
      ><img class="img-fluid" src=${movie.imageUrl} alt="${movie.name} Picture"
    /></a>
  </div>`
}

//function to generate Fantasy movies/shows
const generateFantasy = async (url, genres) => {
  try {
    const response = await fetch(url + genres[0], {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
      },
    })

    const fantasyMovies = await response.json()
    console.log("Fantasy: ", fantasyMovies)

    const fantasyRow = document.querySelector("#fantasy-container .row")
    fantasyMovies.forEach((movie) => {
      fantasyRow.innerHTML += generateCol(movie)
    })
  } catch (err) {
    console.log(err)
  }
}

//function to generate Comedy movies/shows
const generateComedy = async (url, genres) => {
  try {
    const response = await fetch(url + genres[1], {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
      },
    })

    const comedyMovies = await response.json()
    console.log("Comedy: ", comedyMovies)

    const comedyRow = document.querySelector("#comedy-container .row")
    comedyMovies.forEach((movie) => {
      comedyRow.innerHTML += generateCol(movie)
    })
  } catch (err) {
    console.log(err)
  }
}

//function to generate Drama movies/shows
const generateDrama = async (url, genres) => {
  try {
    const response = await fetch(url + genres[2], {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
      },
    })

    const dramaMovies = await response.json()
    console.log("Drama: ", dramaMovies)

    const dramaRow = document.querySelector("#drama-container .row")
    dramaMovies.forEach((movie) => {
      dramaRow.innerHTML += generateCol(movie)
    })
  } catch (err) {
    console.log(err)
  }
}

//function to generate trending now movies/shows
const generateTrendingNow = async (url, genres) => {}
//Window onload
window.onload = () => {
  const url = "https://striveschool-api.herokuapp.com/api/movies/"
  const genres = ["Fantasy", "Comedy", "Drama"]

  // generate Fantasy movies/shows
  generateFantasy(url, genres)

  // generate Comedy movies/shows
  generateComedy(url, genres)

  // generate Drama movies/shows
  generateDrama(url, genres)

  // generate Trending Now movies/shows
  generateTrendingNow(url, genres)
}
