class Movie {
  constructor(title, year, price) {
    this.title = title;
    this.year = year;
    this.price = price;
  }
}


const movieSelectElement = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const countElement = document.getElementById("count");
const totalElement = document.getElementById("total");

let selectedMoviePrice = 0;
let selectedSeatsCount = 0;


async function fetchMovies() {
  try {
    const movies = await getMoviesData(); 
    populateMovieDropdown(movies); 
    setDefaultMovie(movies); 
  } catch (err) {
    console.log("Något gick fel vid hämtning:", err);
  }
}


async function getMoviesData() {
  const response = await fetch("movies.json");
  if (!response.ok) {
    throw new Error("Kunde inte hämta filmer");
  }

  const moviesData = await response.json();

  return moviesData.map(function (movie) {
    return new Movie(movie.Title, movie.Year, movie.Price); 
  });
}


function populateMovieDropdown(movies) {
  movieSelectElement.innerHTML = ""; 

  movies.forEach(function (movie) {
    const option = document.createElement("option");
    option.value = movie.price; 
    option.textContent =
      movie.title + " (" + movie.year + ") - " + movie.price + " kr"; 
    movieSelectElement.appendChild(option); 
  });
}


function setDefaultMovie(movies) {
  if (movies.length > 0) {
    selectedMoviePrice = movies[0].price; 
    updateTotalPrice(); 
  }
}


function updateTotalPrice() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  selectedSeatsCount = selectedSeats.length;
  countElement.textContent = selectedSeatsCount; 
  totalElement.textContent = selectedSeatsCount * selectedMoviePrice; 
}


movieSelectElement.addEventListener("change", function (e) {
  selectedMoviePrice = +e.target.value; 
  updateTotalPrice(); 
});


seats.forEach(function (seat) {
  seat.addEventListener("click", function () {
    seat.classList.toggle("selected"); 
    updateTotalPrice(); 
  });
});


fetchMovies();
