//get Movie ID if any
const movieID = new URLSearchParams(window.location.search).get("movieID")

//Url
const url = "https://striveschool-api.herokuapp.com/api/movies/"

// check if there's an Id on on search, if so let the url be modified by it
const endPoint = movieID ? url + movieID : url

//method to use depending if there's an ID or not
const method = movieID ? "PUT" : "POST"

//Check if theres an Id of search if so change the movie inputs to what they had previously, and change the method to put

const isLoading = async function (loading) {
  const spinner = document.querySelector(".spinner-grow")
  console.log(spinner)
  if (loading) {
    spinner.classList.remove("d-none")
  } else {
    spinner.classList.add("d-none")
  }
}

//Check if theres an Id of search if so change the movie inputs to what they had previously, and change the method to put
const checkId = async function () {
  if (movieID) {
    const submitEditBtn = document.querySelector("#submit-edit-btn")
    submitEditBtn.innerText = "Edit"

    document.querySelector("#delete-btn").classList.remove("d-none")

    document.querySelector("#add-or-edit-title").innerText =
      "Edit your Movie/Show"

    isLoading(true)
    try {
      const response = await fetch(endPoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
        },
      })

      const movie = await response.json()

      isLoading(false)

      document.getElementById("movie-show-name").value = movie.name
      document.getElementById("movie-show-description").value =
        movie.description
      document.getElementById("movie-show-category").value = movie.category
      document.getElementById("movie-show-image").value = movie.imageUrl
    } catch (err) {
      document.querySelector("#error-container .text-danger").innerText = err
    }
  } else {
    isLoading(false)
  }
}

// function to submit or edit a movie
const postOrEditMovies = async (event) => {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
    },
  })

  const movies = await response.json()
  console.log(movies)
}

window.onload = () => {
  checkId()
}
