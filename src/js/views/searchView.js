import {
    elements,
    movieGenres
} from "../base";

export const displayResults = (data, keyword) => {
    // show search result count and check if it is category search
    if (keyword > 0) {
        for (let genreInfo of movieGenres) {
            if (genreInfo.id == keyword) keyword = `#${genreInfo.name}`;
        }
    }
    elements.resultCount.innerHTML = `${data.total_results} results found for "${keyword}"`;

    data.results.forEach(movie => {
        // check image 
        let imgSrc = `https://www.themoviedb.org/t/p/w154/${movie.poster_path}`;
        if (movie.poster_path == null) imgSrc = "img/no-image.png";

        // check overview words count
        const wordsCount = movie.overview.split(" ");
        if (wordsCount.length > 75) {
            movie.overview = wordsCount.slice(0, 70).join(" ") + " ...";
        }

        const html = `
            <div class="card mb-4 border-0">
                <div class="row g-0">
                    <div class="col-md-1">
                        <img src="${imgSrc}" class="img-fluid"
                            alt="...">
                    </div>
                    <div class="col-md-11">
                        <div class="card-body pt-0">
                            <h5 class="card-title">
                                <span id="vote_average" class="rounded bg-dark text-white text-sm">${movie.vote_average}</span>

                                <a id="movie-title" href="#${movie.id}">
                                ${movie.title}
                                </a>
                            </h5>
                            <p class="card-text">
                            ${movie.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        elements.results.insertAdjacentHTML("beforeend", html);
    });
}