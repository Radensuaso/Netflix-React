// function to check if it's loading

const isLoading = async function (loading, s) {
  const spinnerArray = [
    document.querySelector("#fantasy-container .spinner-grow"),
    document.querySelector("#comedy-container .spinner-grow"),
    document.querySelector("#drama-container .spinner-grow"),
    document.querySelector("#trending-now-container .spinner-grow"),
  ]
  if (loading) {
    spinnerArray[s].classList.remove("d-none")
  } else {
    spinnerArray[s].classList.add("d-none")
  }
}

//function to generate cols
const generateCol = (movie) => {
  return `<div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-4">
    <a href="../backoffice.html?movieID=${movie._id}&movieCategory=${movie.category}"
    target="_blank"><img class="img-fluid" src=${movie.imageUrl} alt="${movie.name} Picture"
    /></a>
  </div>`
}

//function to Fetch movies/shows depending on genres
const fetchMovies = async (url, genres, k) => {
  try {
    const response = await fetch(url + genres[k], {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
      },
    })

    const movies = await response.json()
    return movies
  } catch (err) {
    switch (k) {
      case 0:
        const fantasyErrorAlert = document.querySelector(
          "#fantasy-container .alert-danger"
        )
        fantasyErrorAlert.classList.remove("d-none")
        fantasyErrorAlert.innerText = err
        break
      case 1:
        const comedyErrorAlert = document.querySelector(
          "#comedy-container .alert-danger"
        )
        comedyErrorAlert.classList.remove("d-none")
        comedyErrorAlert.innerText = err
        break
      case 2:
        const dramaErrorAlert = document.querySelector(
          "#drama-container .alert-danger"
        )
        dramaErrorAlert.classList.remove("d-none")
        dramaErrorAlert.innerText = err
        break
      default:
        break
    }
  }
}

//function to generate Fantasy movies/shows
const generateFantasy = async (url, genres) => {
  const fantasyMovies = await fetchMovies(url, genres, 0)
  console.log("Fantasy: ", fantasyMovies)

  //Here we randomly sort the array to display the movies/shows in different orders every time
  fantasyMovies.sort(function () {
    return 0.5 - Math.random()
  })

  const fantasyRow = document.querySelector("#fantasy-container .row")
  fantasyMovies.forEach((movie) => {
    fantasyRow.innerHTML += generateCol(movie)
  })

  isLoading(false, 0)
}

//function to generate Comedy movies/shows
const generateComedy = async (url, genres) => {
  const comedyMovies = await fetchMovies(url, genres, 1)
  console.log("Comedy: ", comedyMovies)

  //Here we randomly sort the array to display the movies/shows in different orders every time
  comedyMovies.sort(function () {
    return 0.5 - Math.random()
  })

  const comedyRow = document.querySelector("#comedy-container .row")
  comedyMovies.forEach((movie) => {
    comedyRow.innerHTML += generateCol(movie)
  })
  isLoading(false, 1)
}

//function to generate Drama movies/shows
const generateDrama = async (url, genres) => {
  const dramaMovies = await fetchMovies(url, genres, 2)
  console.log("Drama: ", dramaMovies)

  //Here we randomly sort the array to display the movies/shows in different orders every time
  dramaMovies.sort(function () {
    return 0.5 - Math.random()
  })

  const dramaRow = document.querySelector("#drama-container .row")
  dramaMovies.forEach((movie) => {
    dramaRow.innerHTML += generateCol(movie)
  })
  isLoading(false, 2)
}

//function to generate trending now movies/shows
const generateTrendingNow = async (url, genres) => {
  const fantasyMovies = await fetchMovies(url, genres, 0)
  fantasyMovies.sort(function () {
    return 0.5 - Math.random()
  })

  const comedyMovies = await fetchMovies(url, genres, 1)
  comedyMovies.sort(function () {
    return 0.5 - Math.random()
  })
  const dramaMovies = await fetchMovies(url, genres, 2)
  dramaMovies.sort(function () {
    return 0.5 - Math.random()
  })

  const trendingNowMovies = [
    ...fantasyMovies.slice(0, 2),
    ...comedyMovies.slice(0, 2),
    ...dramaMovies.slice(0, 2),
  ]

  const trendingNowRow = document.querySelector("#trending-now-container .row")
  trendingNowMovies.forEach((movie) => {
    trendingNowRow.innerHTML += generateCol(movie)
  })
  isLoading(false, 3)
}
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
