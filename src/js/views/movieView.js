import {
    elements,
    renderLoader,
    movieGenres,
    clearInputs
} from "../base";

import * as main from "../index"

export const displayMovie = (data) => {
    // movie genres info
    let categoriesHtml = "";
    for (let genre of data.genres) {
        // find and set genreId
        let genreId;
        for (let category of movieGenres) {
            if (genre.name == category.name) {
                genreId = category.id;
            }
        }

        let span = `
            <span data-genreId="${genreId}" id="category" class="bg-dark text-white py-1 px-2 rounded-1">${genre.name}</span>
        `;
        categoriesHtml += span;
    }

    // companies info
    let companiesHtml = "";
    for (let compInfo of data.production_companies) {
        let comp = `${compInfo.name}, `;
        companiesHtml += comp;
    }
    companiesHtml = companiesHtml.trim().slice(0, -1)

    // check image
    let imgSrc = `https://www.themoviedb.org/t/p/w342/${data.poster_path}`;
    if (data.poster_path == null) imgSrc = "img/no-image-big.png";

    const movieHtml = `        
        <div class="card mb- border-0 mt-4">
            <div class="row g-0 mb-2">
                <div class="col-md-2">
                    <img src="${imgSrc}"
                        class="img-fluid" alt="...">
                </div>
                <div class="col-md-10">
                    <div class="card-body pt-0">
                        <h5 class="card-title">
                            <span id="movie-title" style="pointer-events: none; font-size: 22px;">
                                ${data.title}
                            </span>
                        </h5>
                        <p class="card-text" style="font-size: 16px;">
                            ${data.overview}
                        </p>

                        <hr>

                        <div id="categories">
                            ${categoriesHtml}
                        </div>

                        <div class="my-3">
                            Release Date:
                            <span id="releaseDate">
                                ${data.release_date}
                            </span>

                            Production Companies: 
                            <div id="productionComp">
                                ${companiesHtml}
                            </div>
                        </div>

                        <div>
                            Voite Average:
                            <span id="vote_average" class="rounded bg-dark text-white text-sm" style="font-size: 12px; padding: 3px 10px;">
                                ${data.vote_average}
                            </span>

                            Tagline: 
                            <span id="tagline">
                               "${data.tagline}"
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <hr>

        </div>
    `;

    elements.detailedMovie.insertAdjacentHTML('beforeend', movieHtml);

    // movie genres event
    document.querySelectorAll("#category").forEach(item => {
        item.addEventListener('click', e => {
            const genreId = e.target.getAttribute("data-genreId");
            clearInputs();
            main.categoryController(genreId, 1);
            renderLoader(elements.mainInfoBox);

            // set selected genre to category select element
            elements.categoryForm.value = genreId;
        });
    });
}

export const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}