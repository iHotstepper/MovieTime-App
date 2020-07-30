<template>
        <v-container class="col-lg-8 col-xl-8 my-6 black" style="max-width: 1180px;">
            <v-row align="stretch">
                <v-col xs="12" sm="6" md="3" lg="3" >
                    <v-row class="ml-sm-1">
                        <v-img v-if="movieDetails.poster_path" :src="movieImageDB.large + movieDetails.poster_path"></v-img>
                        <v-img v-else :src="placeholderImg"></v-img>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row class="justify-space-between align-center">
                        <p class="text-h4 ma-4 pl-4 col-xs-6 font-weight-medium">{{ movieDetails.title }}</p>
                        <div class="text-center text-body-1 purple accent-2 rounded-circle d-inline-flex align-center justify-center mx-4 pa-3" style="height: 52px; width: 52px">
                            {{ movieDetails.vote_average }}
                        </div>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12">
                            <v-row justify="start">
                            <p class="text-body-1 ma-4 pl-4 grey--text text--lighten-2 font-weight-light col-10">{{ movieDetails.overview }}</p>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-divider></v-divider>
                            <v-row class="justify-start px-6 xs-6" justify="start" align="center">
                                <div class="pa-4 text-body-2 grey--text text--lighten-2">
                                    Release date: {{ movieDetails.release_date }}
                                </div>
                                <div class="pa-4 text-body-2 grey--text text--lighten-2">
                                    Duration: {{ movieDetails.runtime }}
                                </div>
                                <div class="pa-4 text-body-2 grey--text text--lighten-2">
                                    Budget: {{ movieDetails.budget }}
                                </div>
                            </v-row>
                            <v-divider></v-divider>
                        </v-col>
                        <v-col>
                            <v-row class="pl-8 xs-6" justify="space-between" align="center">
                                <v-tooltip bottom :disabled="isWatchlistTooltipDisabled">
                                <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on">
                                        <v-btn text outlined style="background-color: #00BFA5" @click="addToWatchlist" v-if="showWatchlistButton" :disabled="!enableWatchlistButton" class="mr-4">
                                            <v-icon left>{{ watchlistButtonIcon }}</v-icon>
                                            <span class='d-none d-md-flex'>{{ watchlistButtonText }}</span>
                                            <span class='d-md-none'>Watchlist</span>
                                        </v-btn>
                                    </div>
                                </template>
                                <span>Log in to add to watchlist</span>
                                </v-tooltip>
                                <v-btn outlined small target="_blank" style="color: #f4c517" :href="`https://www.imdb.com/title/${movieDetails.imdb_id}`" class="mr-4">
                                    <v-icon left size="16">mdi-movie-search-outline</v-icon>
                                    <span class='d-none d-md-flex'>IMDB Page</span>
                                    <span class='d-md-none'>IMDB</span>
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <br>
            <v-col>
                <v-row justify="space-between" align="center" class="px-5 mt-5">
                    <p class="text-h4 font-weight-light justify-center mb-0">Actors</p>
                    <v-switch v-model="showAllActors" label="Show all"></v-switch>
                </v-row>
            </v-col>
            <v-row style="background-color: #212121">
                <v-col cols="12" justify="space-around" align="center">
                    <v-row>
                    <actors-tile
                        v-for="(actor, index) in movieActors"
                        v-bind:key="index"
                        v-bind:actor="actor"
                        v-bind:index="index"
                        v-bind:showall="showAllActors"
                    ></actors-tile>
                    </v-row>
                </v-col>
            </v-row>
            <v-row v-if="movieImages">
                <v-col cols="12" justify="space-around" align="center">
                    <v-row>
                        <v-carousel>
                            <v-carousel-item
                            v-for="(image ,index) in movieImages"
                            :key="index"
                            :src="movieImageDB.large + image.file_path"
                            ></v-carousel-item>
                        </v-carousel>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import db from '@/firebase/init'
import ActorsTile from '../components/ActorsTile'

export default {
    components: {
        ActorsTile
    },
    data () {
        return {
            movieImageDB: {
                small: "https://image.tmdb.org/t/p/w185",
                medium: "https://image.tmdb.org/t/p/w300",
                large: "https://image.tmdb.org/t/p/w1280",
                original: "https://image.tmdb.org/t/p/original"
            },
            apiKey: "05a0bae960009a45fc3eb4513c777d11",
            movieDetails: [],
            movieActors: [],
            movieImages: null,
            placeholderImg: 'https://via.placeholder.com/1280x1920/000000/?text=no+image',
            userObject: null,
            userMoviesIds: null,
            watchlistButtonText: 'Add to watchlist',
            watchlistButtonIcon: 'mdi-plus-circle-outline',
            isWatchlistTooltipDisabled: false,
            showWatchlistButton: false,
            enableWatchlistButton: false,
            showAllActors: false
        }
    },

    methods: {

        getMovieDuration() {
            // Formatting the duration of the movie
            let mins = this.movieDetails.runtime
            let h = Math.floor(mins / 60);
            let m = mins % 60;
            m = m < 10 ? "0" + m : m;
            this.movieDetails.runtime = `${h}h ${m}m`;
        },

        addToWatchlist() {
            // Disable the watchlist button and update the text
            this.enableWatchlistButton = false
            this.watchlistButtonText = 'Movie was added'
            this.watchlistButtonIcon = 'mdi-check-circle-outline'

            // Create the movie object for the DB
            let movieObject = this.movieDetails
            let ref = db.collection('watchlist').doc(this.userObject.uid)

            ref.get().then(() => {
                db.collection('watchlist').doc(this.userObject.uid).update( {
                    [`userWatchlist.${movieObject.id}`]: movieObject
                });
            })
        },
    },
    
    created() {
        
        window.scrollTo(0,0)

        // Fetch the details about the movie
        axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${this.apiKey}&language=en-US`)
        .then(res => {
            const result = res.data;
            this.movieDetails = result
            this.getMovieDuration()
            this.movieDetails.budget === 0 ? this.movieDetails.budget = '-' : this.movieDetails.budget = `$${this.movieDetails.budget.toLocaleString()}`
        }).catch(error => console.log(error))   
        
        
        // Fetch the actors
        axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits?api_key=${this.apiKey}`)
        .then(res => {
            const result = res.data;
            this.movieActors = result.cast
        }).catch(error => console.log(error))   
        

        // Fetch the movie images
        axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/images?api_key=${this.apiKey}&language=null`)
        .then(res => {
            const result = res.data;
            this.movieImages = result.backdrops
        }).catch(error => console.log(error))   


        // Check to see if the user if logged in
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                // Disable the tooltip, enable the watchlist button and create the user object
                this.isWatchlistTooltipDisabled = true
                this.enableWatchlistButton = true
                this.userObject = user

                let ref = db.collection('watchlist').doc(user.uid)
                ref.get()
                .then((doc) => {

                    let userData = doc.data();

                    // Check if the movie is already in watchlist
                    if(Object.keys(userData).length > 1 && Object.prototype.hasOwnProperty.call(userData.userWatchlist, this.movieDetails.id)){
                        this.enableWatchlistButton = false
                        this.watchlistButtonText = 'Movie was added'
                        this.watchlistButtonIcon = 'mdi-check-circle-outline'
                    }
                    this.showWatchlistButton = true

                })
                .catch((error) => {
                    console.log(error);
                });
                
            }   else {
                // Then in no user is logged in, show the button
                this.showWatchlistButton = true

            }
        })
    }
}
</script>

<style>

</style>