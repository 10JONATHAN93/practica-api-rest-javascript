// sección
const headerSection = document.querySelector('#header'); // el id de la etiqueta header
const trendingPreviewSection = document.querySelector('#trendingPreview'); // el id de la primera etiqueta de section del html
const categoriesPreviewSection = document.querySelector('#categoriesPreview'); // el id de la segunda etiqueta de section del html
const genericSection = document.querySelector('#genericList'); // el id de la tercera etiqueta de section del html
const movieDetailSection = document.querySelector('#movieDetail') // el id de la cuarta etiqueta de section del html

// formulario de busqueda
const searchForm = document.querySelector('#searchForm'); // el id de la etiqueta form del html

//listas
const trendingPreviewMovieList = document.querySelector('.trendingPreview-movieList'); // el id de la etiqueta article que se encuentra en la primer etiqueta section del html
const categoriesPreviewList = document.querySelector('.categoriesPreview-list'); // el id de la etiqueta article que se encuentra en la segunda etiqueta section del html
const movieDetailCategoriesList = document.querySelector('#movieDetail .categories-list'); // el nombre de la clase de la etiqueta article que se encuentra en la cuarta etiqueta section del html
const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer'); // el nombre de la clase de la etiqueta div que se encuentra en la cuarta etiqueta section del html

// elementos
    // elementos del header
const headerTitle = document.querySelector('.header-title'); 
const arrowButton = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');

    //elementos del formulario
const searchFormInput = document.querySelector('#searchForm input');
const searchFormButton = document.querySelector('#searchButton');

    // elementos de la seccion TrendingPreview
const trendingButton = document.querySelector('.trendingPreview-btn');

    // elementos de la seccion movieDetail
const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score');