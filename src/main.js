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
})


async function getMoviesTrending() {
    const { data } = await api('trending/movie/day')
    const movies = data.results;

    movies.forEach(movie => {
        // console.log(movie.poster_path);
        
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');


        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);



    });
}


async function getMoviesGenres() {
  const { data } = await api('genre/movie/list')
  const genres = data.genres;

 //  console.log(genres);

  genres.forEach(genre => {
    const PreviewGenresContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const titleGenre = document.createElement('h3');
    titleGenre.classList.add('category-title');
    titleGenre.setAttribute('id',`id${genre.id}`);

    const textTitle = document.createTextNode(genre.name);
    titleGenre.appendChild(textTitle);
    categoryContainer.append(titleGenre);
    PreviewGenresContainer.appendChild(categoryContainer);
  })
}

