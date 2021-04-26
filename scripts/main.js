function getMovies() {
  const moviesContainer = document.querySelector("main");
  const url = "https://movies-app-siit.herokuapp.com/movies";

  const promise = fetch(url)
    .then(handleResponse)
    .then((data) => {
      for (const movie of data.results) {
        if (isValidMovieInfo(movie)) {
          renderMovieCard(movie);
        } else {
          console.log(
            "Movie with id = " +
              movie._id +
              " , image = " +
              movie.Poster +
              " , title = " +
              movie.Title +
              " is invalid!"
          );
        }
      }
    });

  function handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Could not query the list of movies from server!");
  }

  function isValidMovieInfo(movie) {
    if (
      isValidFieldInfo(movie._id) &&
      (isValidFieldInfo(movie.Poster) || isValidFieldInfo(movie.Title))
    ) {
      return true;
    }

    return false;
  }

  function isValidFieldInfo(movieInfo) {
    if (
      movieInfo == null ||
      movieInfo.trim() == "" ||
      movieInfo.trim().toLowerCase() == "n/a"
    ) {
      return false;
    }

    return true;
  }

  function renderMovieCard(movie) {
    console.log("Movie id: " + movie._id);
    const movieCardContainer = document.createElement("div");
    movieCardContainer.classList.add("movie-card-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-image");
    movieImg.src = isValidFieldInfo(movie.Poster)
      ? movie.Poster
      : "/images/movie_default_image.jpg";
    console.log("Movie image: " + movieImg.src);

    const movieTitle = document.createElement("a");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = isValidFieldInfo(movie.Title)
      ? movie.Title
      : "Unknown movie title";
    movieTitle.href = `movieDetails.html?movieId=${movie._id}`;
    console.log("Movie title: " + movieTitle.textContent);

    movieCardContainer.appendChild(movieImg);
    movieCardContainer.appendChild(movieTitle);
    moviesContainer.appendChild(movieCardContainer);
  }
}

getMovies();

// const promise = fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//     for (const movie of data.results) {
//       movieRating(movie);
//     }
//   });

//   function movieRating(movie) {
//     const movieRatingImdb = document createElement(div);
//     movieRatingImdb.classList.add("stars");
//     if (
//     )
//   }

//   function ajax() {
//     const promise = fetch("https://movies-app-siit.herokuapp.com/movies");
//     promise.then(handleResponse).then(outputRating);
//   }

//   function outputRating(movieRating) {
//     console.log("Receive rating JSON");
//     console.log(movieRatingImdb);
//   }

//   ratingImdb.textContent = movieRating.results.imdbRating;

//   ajax();
