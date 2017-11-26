<template>
  <div id="main-header" class="primary">
    <div class="logo-container">
      <div class="title">Vet</div>
    </div>
    <div class="navigation">
      <router-link :to="{name : 'users'}">Корисници</router-link>
      <router-link :to="{name : 'patientTypes'}">Типови пациенти</router-link>
      <router-link :to="{name : 'notifications'}">Нотификации</router-link>
      <a @click="logOut">Одјава</a>
    </div>
  </div>
</template>

<script>
  import store from '../../store/store';

  export default {
    store,
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