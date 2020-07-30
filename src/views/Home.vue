<template>
  <div
    justify="center"
    align="center"
    >
    <v-container class="col-lg-8 col-xl-8" v-scroll="myScroll">
      <main-header></main-header>
      <years-list :yearsListForTabs="yearsListForTabs"></years-list>
      <v-row justify="end">
        <v-btn
          fixed
          class="align-center"
          id="goup"
          rounded
          color="#E040FB"
          width="10"
          style="z-index: 9999;"
          @click="goUp()"
        >
          up
          <v-icon center size="16">mdi-arrow-up-bold</v-icon>
        </v-btn>
        <movie-tile
          v-for="(movie, index) in moviesList"
          v-bind:key="index"
          v-bind:movie="movie"
          v-bind:moviesIds="movie.genre_ids"
          v-bind:moviesGenresList="moviesGenresList"
        ></movie-tile>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import MovieTile from "../components/MovieTile";
import MainHeader from "../components/MainHeader";
import YearsList from "../components/YearsList";
import infiniteScroll from "vue-infinite-scroll";
import debounce from "lodash/debounce";

export default {
  name: "home",
  directives: { infiniteScroll },
  components: {
    MovieTile,
    MainHeader,
    YearsList,
  },
  data() {
    return {
      apiKey: "05a0bae960009a45fc3eb4513c777d11",
      moviesGenresList: [],
      moviesList: [],
      currentPageNum: 0,
      yearsListForTabs: [],
      currentDate: null,
    };
  },
  methods: {
    goUp() {
      window.scroll({top:0, behavior:'smooth'});
    },

    myScroll() {

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setTimeout(() => {
        for (var i = 0, j = 1; i < j; i++) {
          this.currentPageNum++;
          this.getMovieByYear();
        }
      }, 1000);
      }

    },

    getCurrentDate() {
      // Getting and foramtting the current date
      let currentTime = new Date();
      let year = currentTime.getFullYear();
      let month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
      let day = ("0" + currentTime.getDate()).slice(-2);
      this.currentDate = `${year}-${month}-${day}`;

      // Create an array of years based on the current year and firstYear
      let firstYear = 1990;
      while (firstYear <= year) {
        this.yearsListForTabs.push(firstYear++);
      }
    },

    getMovieByYear() {
      // Fetch the movies list from the DB based on the page number, year and movies that released before the current date
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.currentPageNum}&primary_release_year=${this.$route.params.year}&primary_release_date.lte=${this.currentDate}`
        )
        .then((res) => {
          const data = res.data;
          const result = data.results;

          this.moviesList = this.moviesList.concat(result);
        })
        .catch((error) => console.log(error));
    },

    handleScroll() {
      // Show go up button based on the scroll position
      const goUpButton = document.querySelector("#goup");
      // if(!goUpButton) return
      window.scrollY > 700
        ? (goUpButton.style.visibility = "visible")
        : (goUpButton.style.visibility = "hidden");
    },
  },

  beforeRouteUpdate(to, from, next) {
    // When the route changes, reset the currentPageNum and get the movie list again
    next();
    this.moviesList = [];
    this.currentPageNum = 1;
    this.getMovieByYear();
  },

  created() {
    // Add event listener to the scroll
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener("scroll", this.handleDebouncedScroll);

    // When view is created, get the current date
    this.getCurrentDate();

    // Fetch the list of genres from the DB
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`
      )
      .then((res) => {
        const result = res.data;
        this.moviesGenresList = result.genres;
      })
      .catch((error) => console.log(error));

    // get the movie list from the DB
    this.currentPageNum = 1;
    this.getMovieByYear();
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  },

  mounted() {
    // Set the go up button visibility to hidden
    const goUpButton = document.querySelector("#goup");
    goUpButton.style.visibility = "hidden";
  },
};
</script>

<style lang="scss" scoped>
</style>

