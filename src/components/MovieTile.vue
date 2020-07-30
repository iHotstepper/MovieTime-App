<template>
  <v-col transition="scroll-y-transition" xl="2" lg="3" md="4" sm="4" xs="12">
    <v-fade-transition>
      <v-hover v-slot:default="{ hover }" :value="isHover" transition="scroll-y-transition">
        <v-card
          flat
          class="black"
          height="100%"
          align="start"
          transition="scroll-y-transition"
          @click="getMovieDetails(movie.id), isHover = null"
          :elevation="hover ? 12 : 0"
        >
          <v-responsive
            class="text-center text-body-2 black rounded-circle align-center justify-center rating-badge"
          >{{ movie.vote_average }}</v-responsive>
          <v-img
            v-if="movie.poster_path"
            :src="movieImageDB.medium + movie.poster_path"
            transition="scroll-y-transition"
          ></v-img>
          <v-img v-else :src="placeholderImg" transition="scroll-y-transition"></v-img>
          <v-card-title
            class="text-h6 font-weight-normal"
            style="font-size: 1.15em !important"
            transition="scroll-y-transition"
          >{{ movie.title }}</v-card-title>
          <v-card-subtitle transition="scroll-y-transition">{{ movieFilteredGenres }}</v-card-subtitle>
          <v-btn @click.stop="deleteMovieFunction(movie.id)" v-if="deleteMovieFunction" text>
            <v-icon center>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-card>
      </v-hover>
    </v-fade-transition>
  </v-col>
</template>

<script>
export default {
  // name: 'moviebox',
  props: ["movie", "moviesGenresList", "moviesIds", "deleteMovieFunction"],
  data() {
    return {
      movieImageDB: {
        small: "https://image.tmdb.org/t/p/w185",
        medium: "https://image.tmdb.org/t/p/w300",
        large: "https://image.tmdb.org/t/p/w1280",
        original: "https://image.tmdb.org/t/p/original",
      },
      placeholderImg:
        "https://via.placeholder.com/300x450/000000/?text=no+image",
      isHover: false,
    };
  },
  computed: {
    // Getting the movie genre IDs and returns filtered ones
    movieFilteredGenres() {
      return this.moviesIds
        .map((id) => {
          const item = this.moviesGenresList.find((item) => item.id === id);
          return item ? item.name : null;
        })
        .join(", ");
    },
  },
  methods: {
    // Directs the user to the movie detail page
    getMovieDetails(movieID) {
      this.$router.push({ name: "movie", params: { id: movieID } });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
.v-card__title {
  line-height: 1.4rem;
  padding-bottom: 1.4rem !important;
}
.v-tab--active {
  color: #e040fb !important;
}

.rating-badge {
  height: 34px;
  width: 34px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
  color: #e040fb;
}
</style>