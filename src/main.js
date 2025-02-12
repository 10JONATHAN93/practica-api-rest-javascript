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

function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem('liked_movies'));
  let movies;

  if (item) {
    movies = item;
  } else {
    movies = {};
  }
  
  return movies;
}

function likeMovie(movie) {
  // movie.id
  const likedMovies = likedMoviesList();

  console.log(likedMovies)
  
  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }

  localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
}


// Utils 
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img')
      entry.target.setAttribute('src', url);
    }
  });
});


function createMovies(
  movies,
  container,
  {
    useObserver = false,
    clean = true,
  } = {},
) {

  if (clean) {
    container.innerHTML = '';
  }

  movies.forEach(movie => {   
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    const movieImg = document.createElement('img');
    
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      observer ? 'data-img' : 'src',
      `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
    );

    movieImg.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    });

    movieImg.addEventListener('error', () => {
      movieImg.setAttribute(
        'src',
        'https://static.platzi.com/static/images/error/img404.png',
      );
    });

    const movieBtn = document.createElement('button');
    movieBtn.classList.add('movie-btn');
    likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
    movieBtn.addEventListener('click', () => {
      movieBtn.classList.toggle('movie-btn--liked');
      likeMovie(movie);
    });

    if (observer) {
      observer.observe(movieImg);
    }

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieBtn);
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
    // const moviesWithPosters = movies.filter(movie => movie.poster_path !== null);
    createMovies(movies, trendingPreviewMovieList, {useObserver: true});
}


async function getMoviesGenresPreview() {
  const { data } = await api('genre/movie/list')
  const genres = data.genres;
  createGenres(genres, categoriesPreviewList, { useObserver: true });
};


async function getMoviesByGenres(categoryID) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: categoryID,
    },
  });
  const movies = data.results;
  // const moviesWithPosters = movies.filter(movie => movie.poster_path !== null);
  createMovies(movies, genericSection, { useObserver: true });
};

function getPaginatedMoviesByCategory(categoryID) {
  return async function () {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;
  
    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api('discover/movie', {
        params: {
          with_genres: categoryID,
          page,
        },
      });
      const movies = data.results;
    
      createMovies(
        movies,
        genericSection,
        { useObserver: true, clean: false },
      );
    }
  }
}


async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;
  console.log(maxPage);
  // const moviesWithPosters = movies.filter(movie => movie.poster_path !== null);
  createMovies(movies, genericSection, { useObserver: true });
};

function getPaginatedMoviesBySearch(query) {
  return async function () {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;
  
    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api('search/movie', {
        params: {
          query,
          page,
        },
      });
      const movies = data.results;
    
      createMovies(
        movies,
        genericSection,
        { useObserver: true, clean: false },
      );
    }
  }
}

async function getMoviesTrending() {
  const { data } = await api('trending/movie/day')
  const movies = data.results;

  // const moviesWithPosters = movies.filter(movie => movie.poster_path !== null);
  createMovies(movies, genericSection, { useObserver: true, clean: true });
}

async function getPaginatedTrendingMovies() {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;
  
  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api('trending/movie/day', {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(
      movies,
      genericSection,
      { useObserver: true, clean: false },
    );
  }
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
  // const moviesWithPosters = similars.filter(similar => similar.poster_path !== null);

  createMovies(similars, relatedMoviesContainer); 
}

function getLikedMovies() {
  const likedMovies = likedMoviesList();
  const moviesArray = Object.values(likedMovies);

  createMovies(moviesArray, likedMoviesListArticle, { useObserver: true, clean: true });
  
  console.log(likedMovies)
}