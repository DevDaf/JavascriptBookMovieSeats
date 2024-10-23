class Movie {
  constructor(title, year, price) {
    this.title = title;
    this.year = year;
    this.price = price;
  }
}

// HTML-element för dropdown och stolar
const movieSelectElement = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const countElement = document.getElementById("count");
const totalElement = document.getElementById("total");

let selectedMoviePrice = 0;
let selectedSeatsCount = 0;

// Hämta filmer från JSON-filen
async function fetchMovies() {
  try {
    const movies = await getMoviesData(); // Hämtar filmlista
    populateMovieDropdown(movies); // Lägg till filmer i dropdown
    setDefaultMovie(movies); // Första filmen som standard
  } catch (err) {
    console.log("Något gick fel vid hämtning:", err);
  }
}

// Hämta JSON-data och skapa Movie-objekt
async function getMoviesData() {
  const response = await fetch("movies.json");
  if (!response.ok) {
    throw new Error("Kunde inte hämta filmer");
  }

  const moviesData = await response.json();
  // Skapa Movie-objekt för varje film
  return moviesData.map(function (movie) {
    return new Movie(movie.Title, movie.Year, movie.Price); // Omvandlar till Movie-objekt
  });
}

// Fills/populates själva dropdown-menyn med filmer
function populateMovieDropdown(movies) {
  movieSelectElement.innerHTML = ""; // Rensa dropdown

  movies.forEach(function (movie) {
    const option = document.createElement("option");
    option.value = movie.price; // Sätt pris som värde
    option.textContent =
      movie.title + " (" + movie.year + ") - " + movie.price + " kr"; // Visa titel och år och pris
    movieSelectElement.appendChild(option); // Lägg till i dropdown
  });
}

// lägger första filmen som standard aka nr 1
function setDefaultMovie(movies) {
  if (movies.length > 0) {
    selectedMoviePrice = movies[0].price; // Sätter pris för första filmen
    updateTotalPrice(); // Uppdatera priset på sidan
  }
}

// Uppdatera priset baserat på hur många stolar som har valts
function updateTotalPrice() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); // Hämtar valda stolar

  selectedSeatsCount = selectedSeats.length; // Räknar valda stolar
  countElement.textContent = selectedSeatsCount; // Visar antal valda stolar
  totalElement.textContent = selectedSeatsCount * selectedMoviePrice; // Uppdatera totalpriset
}

// När användaren väljer en annan film
movieSelectElement.addEventListener("change", function (e) {
  selectedMoviePrice = +e.target.value; // ändrar pris för ny film vald 
  updateTotalPrice(); // Uppdatera totalpriset obv
});

// När användaren klickar på en stol
seats.forEach(function (seat) {
  seat.addEventListener("click", function () {
    seat.classList.toggle("selected"); // Markera eller avmarkera stolen
    updateTotalPrice(); // Uppdatera priset efter du valt
  });
});

// Kör när sidan laddas :)
fetchMovies();
