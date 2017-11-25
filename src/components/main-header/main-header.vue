<template>
  <div id="main-header" class="primary">
    <div class="logo-container">
      <div class="title">Vet</div>
    </div>

    <div class="navigation">
      <router-link to="/users">Корисници</router-link>
      <router-link to="/pacients">Типови пациенти</router-link>
      <router-link to="/notifications">Нотификации</router-link>
      <a @click="logOut">Одјава</a>
    </div>

  </div>
</template>

<script>

  import store from '../../store/store';


  export default {
    store,
    created() {
      console.log(this.self);
    },
    methods: {
      logOut() {
        this.$store.dispatch('signOut').then(() => {
          this.$router.push({name: 'app'});
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "main-header";
</style>