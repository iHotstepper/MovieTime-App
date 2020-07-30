import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MovieDetails from '../views/MovieDetails.vue'
import Watchlist from '../views/Watchlist.vue'
// import ResultsPage from '../components/ResultsPage.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const currentYear = new Date().getFullYear();
  const firstYear = 1990;

  const routes = [
  {
    path: '/', redirect: '/year/2020',
    name: 'redirect'
  },
  {
    path: '/year/:year',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (to.params.year <= currentYear && to.params.year >= firstYear) {
        next();
      } else {
        next({name: 'home', params: { year: 2020 }})
        }
    }
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: MovieDetails,
    props: true
  },
  // {
  //   path: '/search/:query',
  //   name: 'search',
  //   component: ResultsPage,
  //   props: true
  // },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: Watchlist,
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: '*',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
  // scrollBehavior() {
  //   window.scrollTo(0,0);
  // }
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if(user){
      // user signed in, proceed to route
      next()
    } else {
      next({ path: '/' })
    }
  } else {
    next()
  }
})

export default router
