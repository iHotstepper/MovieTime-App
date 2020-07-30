import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import vuetify from './plugins/vuetify';
import 'material-icons/iconfont/material-icons.scss';

let app = null;

Vue.config.productionTip = false

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {

  if(!app){
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')    
  }
  
})

