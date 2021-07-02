//get Movie ID if any
const itemID = new URLSearchParams(window.location.search).get("itemID")

//Url
const url = "https://striveschool-api.herokuapp.com/api/movies/"

// check if there's an Id on on search, if so let the url be modified by it
const endPoint = itemID ? url + itemID : url

//method to use depending if there's an ID or not
const method = itemID ? "PUT" : "POST"

const postOrEditMovies = async () => {
  const response = await fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjUwNTUzOTEsImV4cCI6MTYyNjI2NDk5MX0.4rreCWruc8iinYHIIdhbPTQo52bs9c82UeMWN-fKg0o",
    },
  })

  const movies = await response.json()
  console.log(movies)
}

window.onload = () => {}
