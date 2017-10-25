<template>
    <div id="main-header" class="cyan darken-3">
       <div class="logo-container">

           <div class="title">Vet</div>

       </div>

        <div class="navigation">
            <router-link to="/users">Корисници</router-link>
            <router-link to="/pacients">Типови пациенти</router-link>
            <router-link to="/notifications">Нотификации</router-link>
            <router-link to="/login">Најава</router-link>
        </div>

    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    @import "main-header";
</style>