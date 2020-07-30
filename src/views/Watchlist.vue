<template>
    <div>
        <v-container class="col-lg-8 col-xl-8"> 
            <v-row v-if="feedback" justify="center" class="mt-16">
                <p class="text-h4 mt-4 font-weight-light">{{ watchlistFeedback }}</p>
            </v-row>
            <v-row justify="start">
                <movie-tile
                    class="shrink"
                    v-for="(movie, index) in userMoviesList"
                    v-bind:key="index"
                    v-bind:movie="movie"
                    v-bind:moviesIds="movie.genres"
                    v-bind:moviesGenresList="moviesGenresList"
                    v-bind:deleteMovieFunction="deleteMovie"
                ></movie-tile>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import axios from 'axios'
import MovieTile from '../components/MovieTile'

export default {
    
    name: 'watchlist',

    data () {
        return {
            apiKey: "05a0bae960009a45fc3eb4513c777d11",
            userMoviesList: [],
            moviesGenresList: [],
            currentUser: null,
            userDocRef: null,
            feedback: null,
        }
    },

    components: {
        MovieTile,
    },

    computed: {
        watchlistFeedback() {
            return this.feedback
        }
    },

    methods: {
        // Get the current logged in user's movies list
        fetchMovies(){
        this.currentUser = firebase.auth().currentUser
        this.userDocRef = db.collection('watchlist').doc(this.currentUser.uid)
        this.userDocRef.get()
        .then((doc) => {

                this.userMoviesList = doc.data().userWatchlist;

                if(!this.userMoviesList || Object.keys(this.userMoviesList).length === 0) {
                    
                    this.feedback = 'You have no movies in your watchlist'

                } else {

                    this.feedback = null
                    // Iterate the genres property and return a new array with only the genre ids
                    for (const property in this.userMoviesList) {

                        let genresIdsArray = this.userMoviesList[property].genres.map(genre => genre.id)

                        this.userMoviesList[property].genres = genresIdsArray

                    }
                }
        }).catch((err) => { console.log(err); });
        },

        // Delete a movie from the DB
        deleteMovie(movieId){
            this.userDocRef.update({ [`userWatchlist.${movieId}`]: firebase.firestore.FieldValue.delete() })
            .then(() => {
            this.fetchMovies()
            })
        },

    },

    created() {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
        .then(res => {
            const result = res.data;
            this.moviesGenresList = result.genres
        }).catch(error => console.log(error))
        this.fetchMovies()
    }
    
}

</script>

<style lang="scss" scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}
.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}
.v-card__title {
    line-height: 1.4rem;
    padding-bottom: 1.4rem !important;
}
.v-tab--active {
    color: #e040fb !important;
}
</style>