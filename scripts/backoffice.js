//get Movie ID if any
const movieCategory = new URLSearchParams(window.location.search).get(
  "movieCategory"
)

const movieID = new URLSearchParams(window.location.search).get("movieID")

//Url
const url = "https://striveschool-api.herokuapp.com/api/movies/"

// check if there's an Id and category on on search, if so let the url be modified by it
const deleteLoadInfoEndPoint = movieID ? url + movieID : url

const loadInfoEndPoint = url + movieCategory

//method to use depending if there's an ID or not
const method = movieID ? "PUT" : "POST"

// function to check if it's loading

const isLoading = async function (loading) {
  const spinner = document.querySelector(".spinner-grow")
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
      const response = await fetch(loadInfoEndPoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
        },
      })

      const movies = await response.json()

      movies.forEach((movie) => {
        if (movie._id === movieID) {
          document.getElementById("movie-show-name").value = movie.name
          document.getElementById("movie-show-description").value =
            movie.description
          document.getElementById("movie-show-category").value = movie.category
          document.getElementById("movie-show-image").value = movie.imageUrl
        }
      })

      isLoading(false)
    } catch (err) {
      const errorContainer = document.querySelector(
        "#error-container .text-danger"
      )
      errorContainer.classList.remove("d-none")
      errorContainer.innerText = err
    }
  } else {
    isLoading(false)
  }
}

// function to submit or edit a movie
const postOrEditMovies = async (event) => {
  // prevent the default behavior of the form
  event.preventDefault()

  //submitted Movie as an object
  const submittedMovie = {
    name: document.getElementById("movie-show-name").value,
    description: document.getElementById("movie-show-description").value,
    category: document.getElementById("movie-show-category").value,
    imageUrl: document.getElementById("movie-show-image").value,
  }

  isLoading(true)
  // Fetch the Api and post the new object
  try {
    const response = await fetch(deleteLoadInfoEndPoint, {
      method,
      body: JSON.stringify(submittedMovie),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",

        "Content-Type": "application/json",
      },
    })

    isLoading(false)

    if (response.ok) {
      const alertSuccess = document.querySelector(".alert-success")
      if (movieID) {
        alertSuccess.classList.remove("d-none")
        alertSuccess.innerText = `Your Movie with the was edited with Success!`

        setTimeout(() => {
          window.location.href = "/"
        }, 4000)
      } else {
        alertSuccess.classList.remove("d-none")
        alertSuccess.innerText = `Your Movie was submitted with success!`

        setTimeout(() => {
          window.location.href = "/"
        }, 4000)
      }
    }
  } catch (err) {
    const alertDanger = document.querySelector(".alert-danger")
    alertDanger.classList.remove("d-none")
    alertDanger.innerText = err
    console.log(err)
  }
}

//function to delete a movie/show from the API
const deleteMovie = async function () {
  const confirmed = confirm("Are you sure you want to delete this Movie/Show?")
  if (confirmed) {
    isLoading(true)
    try {
      const response = await fetch(deleteLoadInfoEndPoint, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
        },
      })

      isLoading(false)

      const alertSuccess = document.querySelector(".alert-success")
      if (response.ok) {
        alertSuccess.classList.remove("d-none")
        alertSuccess.innerText = `Your movie was deleted with Success!`
      }

      setTimeout(() => {
        window.location.href = "/"
      }, 4000)
    } catch (err) {
      const alertDanger = document.querySelector(".alert-danger")
      alertDanger.classList.remove("d-none")
      alertDanger.innerText = err
    }
  }
}

window.onload = () => {
  checkId()
}
