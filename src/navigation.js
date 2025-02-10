searchFormButton.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value}`;
});

trendingButton.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowButton.addEventListener('click', () => {
    history.back(); // metodo que me permite devolver en el historial de navegacion
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    // scrollTop permite que la ventana que entremos aparezca desde el inicio de la misma
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

}


function homePage() {
    console.log('Home');
    //seccion del header
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowButton.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
     
    // secccion trending primera section del html
    trendingPreviewSection.classList.remove('inactive');
    // secccion categories segunda section del html
    categoriesPreviewSection.classList.remove('inactive');
    // secccion genericList tercera section del html
    genericSection.classList.add('inactive');
    // secccion movieDetail cuarta section del html
    movieDetailSection.classList.add('inactive');

    getMoviesTrendingPreview();
    getMoviesGenresPreview();
}

function categoriesPage() {
    console.log('Categories');

    //seccion del header
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowButton.classList.remove('inactive');
    arrowButton.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    
    // secccion trending primera section del html
    trendingPreviewSection.classList.add('inactive');
    // secccion categories segunda section del html
    categoriesPreviewSection.classList.add('inactive');
    // secccion genericList tercera section del html
    genericSection.classList.remove('inactive');
    // secccion movieDetail cuarta section del html
    movieDetailSection.classList.add('inactive');

    // separando info de la url de #category=id-name
    const [_, categoryData] = location.hash.split('='); //> aqui separa el #category = id-name en un array con dos elementos
    const [categoryID, categoryName] = categoryData.split('-'); //> aqui separa el id - name en un array con dos elementos

    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByGenres(categoryID);
}

function movieDetailsPage() {
    console.log('movie');

    //seccion del header
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowButton.classList.remove('inactive');
    arrowButton.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    
    // secccion trending primera section del html
    trendingPreviewSection.classList.add('inactive');
    // secccion categories segunda section del html
    categoriesPreviewSection.classList.add('inactive');
    // secccion genericList tercera section del html
    genericSection.classList.add('inactive');
    // secccion movieDetail cuarta section del html
    movieDetailSection.classList.remove('inactive');

     // separando info de la url de #movie=id-movie
    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function searchPage() {
    console.log('Search');

    //seccion del header
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowButton.classList.remove('inactive');
    arrowButton.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    
    // secccion trending primera section del html
    trendingPreviewSection.classList.add('inactive');
    // secccion categories segunda section del html
    categoriesPreviewSection.classList.add('inactive');
    // secccion genericList tercera section del html
    genericSection.classList.remove('inactive');
    // secccion movieDetail cuarta section del html
    movieDetailSection.classList.add('inactive');

    // separando info de la url de #search=name-movie
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function trendsPage() {
    console.log('trends');

    //seccion del header
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowButton.classList.remove('inactive');
    arrowButton.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    
    // secccion trending primera section del html
    trendingPreviewSection.classList.add('inactive');
    // secccion categories segunda section del html
    categoriesPreviewSection.classList.add('inactive');
    // secccion genericList tercera section del html
    genericSection.classList.remove('inactive');
    // secccion movieDetail cuarta section del html
    movieDetailSection.classList.add('inactive');

    getMoviesTrending();
}