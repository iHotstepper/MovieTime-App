<template>
    <v-img :src="backgroundImage" height="365px" class="my-6 rounded-lg">
        <v-row style="height: 300px;" class="mx-4 my-8 rounded-lg" align="center">
            <v-col>
                <h1 class="display-3 hidden-xs-only font-weight-bold">Welcome to MovieTime</h1>
                <h1 class="display-2 d-sm-none font-weight-bold">Welcome to MovieTime</h1>
                <p class="text-h5 mt-4 font-weight-light">Find the most popular movies based on the year</p>
            </v-col>
        </v-row>
    </v-img>
</template>

<script>

export default {
    data () {
        return {
            backgroundImage: require('../assets/hero-bg.svg'),
        }
    },
}
</script>

<style lang="scss" scoped>

</style>