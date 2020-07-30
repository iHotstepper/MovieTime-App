<template>
  <v-app>
    <Navbar />
    <v-main>
      <keep-alive include="home" :max="1"> 
      <router-view></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },

  data: () => ({

}),

};
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
}
</style>
