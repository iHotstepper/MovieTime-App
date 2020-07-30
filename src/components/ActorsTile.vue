<template>
        <v-col transition="scroll-y-transition" v-if="showAllDivs || index < 6">
            <v-fade-transition>>
            <v-card flat class="black" width="160px" height="100%" align="start" transition="scroll-y-transition">
                <v-img v-if="actor.profile_path" :src="actorsImageDB.medium + actor.profile_path" transition="scroll-y-transition"></v-img>
                <v-img v-else :src="placeholderImg" transition="scroll-y-transition"></v-img>
                <v-card-title class="text-h6 font-weight-normal" style="font-size: 1em !important" transition="scroll-y-transition">{{ actor.name }}</v-card-title>
                <v-card-subtitle transition="scroll-y-transition">{{ actor.character }}</v-card-subtitle>
            </v-card>
            </v-fade-transition>
        </v-col>
</template>

<script>

export default {
    
    props: ['actor', 'index', 'showall'],

    data () {
        return {
            actorsImageDB: {
                small: "https://image.tmdb.org/t/p/w185",
                medium: "https://image.tmdb.org/t/p/w300",
                large: "https://image.tmdb.org/t/p/w1280",
                original: "https://image.tmdb.org/t/p/original"
            },
            placeholderImg: 'https://via.placeholder.com/300x450/000000/?text=no+image',
            isHover: false,
        }
    },
    computed: {
        showAllDivs() {
            return this.showall
        }
    }
}
</script>

<style lang="scss" scoped>

</style>