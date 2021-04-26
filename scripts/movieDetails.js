function movieDetails() {
  function getUrlParameterValue(parameterKey) {
    //"?altceva=ceva&movieId=6018075fa1c19b0022112a01&test=8"
    const search = location.search.substr(1); // substr scoate semnul intrebarii din query string

    //"altceva=ceva&movieId=6018075fa1c19b0022112a01&test=8""
    const keyValueParameters = search.split("&");

    // array de stringuri cheie=valoare
    for (const keyValueParameter of keyValueParameters) {
      // Array destructuring
      const [key, value] = keyValueParameter.split("=");

      if (key === parameterKey) {
        return value;
      }
    }

    console.warn(
      'The query parameter "%s" is not available in the URL!',
      parameterKey
    );

    return null;
  }

  const movieId = getUrlParameterValue("movieId");

  if (movieId != null && movieId.trim() != "") {
    console.log("Request details for movie with id = " + movieId);

    fetch("https://movies-app-siit.herokuapp.com/movies/" + movieId)
      .then(handleResponse)
      .then(renderMovieDetails);
  }

  function handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    throw new Error(
      "Could not query the movie details for movie with id = %s from server!",
      movieId
    );
  }

  function renderMovieDetails(movie) {
    console.log("Render movie details for movie with id = " + movie._id);

    const title = document.querySelector("[data-movie-title]");
    title.classList.add("movie-title");
    title.textContent = isValidFieldInfo(movie.Title)
      ? movie.Title
      : "Unknown movie title";
    console.log("Movie title: " + title.textContent);

    const image = document.querySelector("[data-movie-image]");
    image.classList.add("movie-image");
    image.src = isValidFieldInfo(movie.Poster)
      ? movie.Poster
      : "/images/movie_default_image.jpg";
    console.log("Movie image: " + image.src);

    const plot = document.querySelector("[data-movie-plot]");
    plot.classList.add("movie-plot");
    plot.textContent = isValidFieldInfo(movie.Plot)
      ? movie.Plot
      : "Unknown movie plot";
    console.log("Movie plot: " + plot.textContent);

    const ratingImdb = document.querySelector("[data-movie-rating-imdb]");
    ratingImdb.classList.add("movie-rating-imdb");
    ratingImdb.textContent = isValidFieldInfo(movie.imdbRating)
      ? movie.imdbRating
      : "None";
    console.log("Movie rating Imdb: " + ratingImdb.textContent);

    const production = document.querySelector("[data-movie-production]");
    production.classList.add("movie-production");
    production.textContent = isValidFieldInfo(movie.Production)
      ? movie.Production
      : "None";
    console.log("Movie Production: " + production.textContent);
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
}

movieDetails();
