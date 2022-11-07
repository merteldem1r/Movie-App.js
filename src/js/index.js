// api_key:  06d914ee30cf3358b962e1f516707991
// url: https://api.themoviedb.org/3/
// search movie: https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=aaa&page=1&include_adult=false

// import
import Search from "./models/Search";
import {
    elements,
    renderLoader,
    clearLoader,
    movieGenres,
    clearInputs
} from "./base";
import * as searchView from "./views/searchView";
import Movie from "./models/Movie";
import * as movieView from "./views/movieView";
import * as pageView from "./views/pageView";
import Category from "./models/Category";

// state object may have info about search results and selected movie
const state = {};

// search controller
const searchController = async (keyword, page) => {

    if (keyword) {
        state.search = new Search(keyword, page);
        await state.search.getResult();

        // show search results
        searchView.displayResults(state.search.data, keyword);

        // show pages
        pageView.displayPages(state.search.data.total_pages);
        elements.pagesForm.value = state.search.data.page; // set page value current search data page value
        elements.pagesForm.parentElement.classList.add("active");

        state.categorySearch = "";

        setTimeout(() => {
            clearLoader(elements.mainInfoBox);
        }, 500);
    }
}

// search button click
elements.searchForm.addEventListener('submit', e => {
    const keyword = elements.searchInput.value;

    if (elements.searchInput.value == "") {
        alert("Search some keywords");
        return;
    }

    renderLoader(elements.mainInfoBox);
    searchController(keyword, 1); // show first page of keyword results

    clearInputs();
    elements.categoryForm.value = 0; // set category do default value

    e.preventDefault();
});

// page change event
elements.pagesForm.addEventListener('input', (e) => {
    // check what kidn of search it is (by keyword or category)
    if (state.search != "") {
        searchController(state.search.keyword, e.target.value);
    } else {
        categoryController(elements.categoryForm.value, e.target.value);
    }

    renderLoader(elements.mainInfoBox);
    elements.results.innerHTML = "";
});

// add categories to list
const addCategoriesToList = () => {
    movieGenres.forEach(genre => {
        const option = `<option value="${genre.id}">${genre.name}</option>`;
        elements.categoryForm.insertAdjacentHTML('beforeend', option);
    });
};

addCategoriesToList();

// categories controller
export const categoryController = async (categoryId, page) => {
    state.categorySearch = new Category(categoryId, page);
    await state.categorySearch.getMoviesByCategory();
    searchView.displayResults(state.categorySearch.data, categoryId);

    // show pages
    pageView.displayPages(state.categorySearch.data.total_pages);
    elements.pagesForm.value = state.categorySearch.data.page; // set page value current category search data page value
    elements.pagesForm.parentElement.classList.add("active");

    // clear search state info
    state.search = "";

    setTimeout(() => {
        clearLoader(elements.mainInfoBox);
    }, 500);
};

elements.categoryForm.addEventListener('input', (e) => {
    if (e.target.value > 0) {
        clearInputs();
        categoryController(e.target.value, 1);
        renderLoader(elements.mainInfoBox);
    }
});

// moovie controller
const movieController = async () => {
    const id = window.location.hash.replace("#", "");

    // close previous selected movie
    if (elements.detailedMovie.querySelector(".card")) {
        elements.detailedMovie.querySelector(".card").remove();
    }

    // show movie details
    if (id) {
        state.selectedMovie = new Movie(id);
        await state.selectedMovie.getMovieInformation();
        movieView.displayMovie(state.selectedMovie.data);
        console.log(state);

        elements.closeBtn.classList.add("active"); // show closeBtn
        movieView.backToTop();
    }
};

window.addEventListener('hashchange', movieController);

// close selected movie by closeBtn
elements.closeBtn.addEventListener('click', () => {
    elements.closeBtn.classList.remove("active"); // hide closeBtn
    elements.detailedMovie.querySelector(".card").remove();

    // clear state selected movie information
    state.selectedMovie = "";
});

// go to up btn events
window.addEventListener('scroll', () => {
    if (window.scrollY > 250) elements.goToUpBtn.classList.add("active");
    else elements.goToUpBtn.classList.remove("active");
});

elements.goToUpBtn.addEventListener('click', movieView.backToTop);