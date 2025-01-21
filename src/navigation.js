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

    getMoviesTrending();
    getMoviesGenres();
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
}

function searchPage() {
    console.log('Search');
}

function trendsPage() {
    console.log('trends');
}