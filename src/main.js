const apiKey = window.config.apiKey;
const APIAuthorization =  window.config.APIAuthorization;

// empleando axios
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: APIAuthorization,
  }, 
  params: {
    'api_key': apiKey,
  }
});


// Utils 
function createMovies(movies, container) {
  container.innerHTML = '';
  movies.forEach(movie => {   
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`);

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
};

function createGenres(genres, container) {
  container.innerHTML = '';

  genres.forEach(genre => {

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const titleGenre = document.createElement('h3');
    titleGenre.classList.add('category-title');
    titleGenre.setAttribute('id',`id${genre.id}`);

    titleGenre.addEventListener('click', () => {
      location.hash = `#category=${genre.id}-${genre.name}`;
    });
    

    const textTitle = document.createTextNode(genre.name);
    titleGenre.appendChild(textTitle);
    categoryContainer.append(titleGenre);
    container.appendChild(categoryContainer);
  })
};


// llamados de la API
async function getMoviesTrendingPreview() {
    const { data } = await api('trending/movie/day')
    const movies = data.results;
    const moviesWithPosters = movies.filter(movie => movie.poster_path !== null);
    createMovies(moviesWithPosters, trendingPreviewMovieList);
}


async function getMoviesGenresPreview() {
  const { data } = await api('genre/movie/list')
  const genres = data.genres;
  createGenres(genres, categoriesPreviewList);
};


async function getMoviesByGenres(categoryID) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: categoryID,
    },
  });
  const movies = data.results;
  const moviesWithPosters = movies.filter(movie => movie.poster_path !== null);
  createMovies(moviesWithPosters, genericSection);
};


async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    },
  });
  const movies = data.results;
  const moviesWithPosters = movies.filter(movie => movie.poster_path !== null);
  createMovies(moviesWithPosters, genericSection);
};


async function getMoviesTrending() {
  const { data } = await api('trending/movie/day')
  const movies = data.results;

  const moviesWithPosters = movies.filter(movie => movie.poster_path !== null);
  createMovies(moviesWithPosters, genericSection);
}


async function getMovieById(id) {
  const { data: movie } = await api(`movie/${id}`);

  const movieImgUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
  headerSection.style.setProperty("--dynamic-bg", `url(${movieImgUrl})`);

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average.toFixed(1);
  
  createGenres(movie.genres, movieDetailCategoriesList);
  getSimilarsMoviesId(id);
}

async function getSimilarsMoviesId(id) {
  const { data } = await api(`movie/${id}/similar`);
  const similars = data.results;
  const moviesWithPosters = similars.filter(similar => similar.poster_path !== null);

  createMovies(moviesWithPosters, relatedMoviesContainer); 
}