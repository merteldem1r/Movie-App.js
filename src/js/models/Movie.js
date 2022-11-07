export default class Movie {
    constructor(moovieId) {
        this.mooviedId = moovieId;
    }

    async getMovieInformation() {
        const api_key = "06d914ee30cf3358b962e1f516707991";
        const response = await fetch(`https://api.themoviedb.org/3/movie/${this.mooviedId}?api_key=${api_key}`);
        this.data = await response.json();
    }
}