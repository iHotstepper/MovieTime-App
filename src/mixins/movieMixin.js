export default {
    methods: {
        getMovieGenre(genreIds) {
            if(!genreIds) return
            const genres = this.movieGenres
            let filteredGenres = []
            genreIds.forEach(genre => {
                filteredGenres.push(genre.id)
            });

            let genresStr = "";
            genresStr = filteredGenres
            .map(id => {
                const item = genres.find(item => item.id === id);
                return item ? item.name : null;
            })
            .join(", ")
            return genresStr
        },
        getMovieDetails(movieID) {
            this.$router.push({ name: 'movie', params: { id: movieID}})
        },
    }
}