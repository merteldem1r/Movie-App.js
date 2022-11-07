import {
    elements,
    movieGenres,
    clearLoader
} from "../base";

export default class Category {
    constructor(categoryInfo, page) {
        this.categoryInfo = categoryInfo;
        this.page = page
    }

    async getMoviesByCategory() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=06d914ee30cf3358b962e1f516707991&with_genres=${this.categoryInfo}&page=${this.page}`);
            if (response.status == "422") throw new Error("undefined");
            this.data = await response.json();
        } catch (e) {
            console.log(e.message);
            clearLoader(elements.mainInfoBox);
        }
    }
}