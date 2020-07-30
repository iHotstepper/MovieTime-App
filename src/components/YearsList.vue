<template>
    <v-tabs dark background-color="black" grow show-arrows class="mb-6" v-model="yearIndex">
        <v-tabs-slider color="purple accent-2"></v-tabs-slider>
        <v-tab
            v-for="(year, index) in yearsListForTabs"
            :key="index"
            :to="`/year/${year}`"
            color="purple accent-2"
        >
        {{ year }}
        </v-tab>
    </v-tabs>
</template>

<script>

export default {
    props: ['yearsListForTabs'],
    data () {
        return {
            yearIndex: 0,
        }
    },
}
</script>

<style lang="scss" scoped>

</style>