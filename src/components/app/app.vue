<template>
    <v-app>
        <div id="app">
            <main-header></main-header>
            <div class="view-content">
                <router-view></router-view>
            </div>
        </div>
    </v-app>
</template>

<script>

    import MainHeader from '../main-header/main-header.vue';

    export default {
        components: {
            MainHeader,
        }

    }
</script>

<style lang="scss">
    @import "app";
</style>