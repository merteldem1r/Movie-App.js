import {
    clearLoader,
    elements
} from "../base";

export default class Search {
    constructor(keyword, page) {
        this.keyword = keyword;
        this.page = page;
    }

    async getResult() {
        try {
            const api_key = "06d914ee30cf3358b962e1f516707991";
            const base_url = "https://api.themoviedb.org/3";

            const response = await fetch(`${base_url}/search/movie?api_key=${api_key}&language=en-US&query=${this.keyword}&page=${this.page}&include_adult=false`);
            if (response.status == "422") throw new Error("undefined");

            this.data = await response.json(); // information about search
        } catch (e) {
            console.log(e.message);
            clearLoader(elements.mainInfoBox);
        }
    };
}