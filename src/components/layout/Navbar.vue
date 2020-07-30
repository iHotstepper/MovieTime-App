<template>
    <nav>
        <v-app-bar class="black" flat app>
            <v-container class="col-lg-8 col-xl-8" d-flex>
                <v-row justify="center" align="center">
                    <v-icon left style="color: #E040FB" size="28">mdi-movie-roll</v-icon>
                    <v-toolbar-title class="text-uppercase" style="cursor: pointer" href="/">
                    <a href="/home">                        
                        <span class="font-weight-light text-h5">Movie</span>
                        <span class="font-weight-medium text-h5">Time</span>
                    </a>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn min-width="50"  text outlined v-if="!user" @click.stop="showSignup = !showSignup" class="mr-md-4 mr-2 d-none d-md-flex">
                        <span>Signup</span>
                        <v-icon right>mdi-account-plus</v-icon>
                        <!-- <span class='d-none d-sm-flex'>Signup</span>
                        <v-icon class='d-none d-sm-flex' right>mdi-account-plus</v-icon>
                        <v-icon class='d-sm-none'>mdi-account-plus</v-icon> -->
                    </v-btn>
                    <v-btn min-width="50" class='d-none d-md-flex' text outlined v-if="!user" @click.stop="showLogin = !showLogin">
                        <span>Login</span>
                        <v-icon right>exit_to_app</v-icon>
                        <!-- <span class='d-none d-sm-flex'>Login</span>
                        <v-icon class='d-none d-sm-flex' right>exit_to_app</v-icon>
                        <v-icon class='d-sm-none'>exit_to_app</v-icon> -->
                    </v-btn>
                    <v-menu offset-y class="hidden-sm-and-up">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        class="hidden-md-and-up"
                        dark
                        text
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        >
                        <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    <v-list width="200px" class="black hidden-md-and-up">
                        <v-list-item
                        v-if="!user"
                        @click.stop="showSignup = !showSignup"
                        >
                        <v-list-item-title>Signup</v-list-item-title>
                        <v-icon right>mdi-account-plus</v-icon>
                        </v-list-item>
                        <v-list-item
                        v-if="!user"
                        @click.stop="showLogin = !showLogin"
                        >
                        <v-list-item-title>Login</v-list-item-title>
                        <v-icon right>exit_to_app</v-icon>
                        </v-list-item>
                        <v-list-item
                        v-if="user"
                        @click="$router.push({ path: '/watchlist'}).catch(()=>{})"
                        >
                        <v-list-item-title>Watchlist</v-list-item-title>
                        <v-icon right>mdi-format-list-bulleted-square</v-icon>
                        </v-list-item>
                        <v-list-item
                        v-if="user"
                        @click="logout"
                        >
                        <v-list-item-title>Logout</v-list-item-title>
                        <v-icon right>mdi-logout-variant</v-icon>
                        </v-list-item>
                        
                    </v-list>
                    </v-menu>
                    <div v-if="user" class='d-none d-md-flex'>{{ user.email }}</div>
                    <v-btn text outlined color="#2195f3" v-if="user" @click="$router.push({ path: '/watchlist'}).catch(()=>{})" class="ml-md-4 d-none d-md-flex">
                        <span>Watchlist</span>
                        <v-icon right>mdi-format-list-bulleted-square</v-icon>
                    </v-btn>
                    <v-btn text outlined v-if="user" @click="logout" class="ml-md-4 ml-2 d-none d-md-flex">
                        <span>Logout</span>
                        <v-icon right>mdi-logout-variant</v-icon>
                    </v-btn>
                    <v-dialog
                        v-model="showSignup"
                        max-width="340"
                        overlay-opacity="0.8"
                        style="z-index: 99999;"
                    >
                    <signup v-on:closedialog="showSignup = !showSignup" v-if="showSignup"></signup>
                    </v-dialog>
                    <v-dialog
                        v-model="showLogin"
                        max-width="340"
                        overlay-opacity="0.8"
                        style="z-index: 99999;"
                    >
                    <login v-on:closedialog="showLogin = !showLogin" v-if="showLogin"></login>
                    </v-dialog>
                </v-row>
            </v-container>
        </v-app-bar>
    </nav>
</template>

<script>
import firebase from 'firebase'
import Signup from '../auth/Signup'
import Login from '../auth/Login'

export default {
    data () {
        return {
            apiKey: "05a0bae960009a45fc3eb4513c777d11",
            user: null,
            showSignup: false,
            showLogin: false,
            movieSearchQuery: null,
            searchMovies: null,
        }
    },
    components: {
        Signup,
        Login
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push({ path:  '/' }).catch(()=>{});
            })
        },

        searchMovie () {
            if(!this.movieSearchQuery) return
            this.$router.push({ name: 'search', params: { query: this.movieSearchQuery}})
        }
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.user = user
            }   else {
                this.user = null
            }
        })
    }
    
}
</script>

<style scoped>
a {
    color: white !important;
    text-decoration: none;
}
a:hover 
{
     color: white; 
     text-decoration:none; 
     cursor:pointer;  
}
</style>

