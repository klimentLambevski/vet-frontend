<template>
  <v-app>
    <loading v-if="isLoading"></loading>
    <div id="app">
      <main-header></main-header>
      <div class="view-content">
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>

<script>

  import store from '../../store/store';

  import MainHeader from '../main-header/main-header.vue';
  import {initToken, signIn} from "../../services/auth";
  import {globalState} from "../../store/global";
  import Loading from '../loading/loading.vue';
  import {getCustomer, getCustomers} from "../../services/customer";

  export default {
    store,
    components: {
      MainHeader,
      Loading
    },
    data: () => ({
      isLoading: true
    }),
    methods: {
      clearLoading() {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    created() {
      initToken();


      if (globalState.token) {
        this.$store.dispatch('checkAuth')
          .then(() => {
            this.clearLoading();
            getCustomers('7ca552c4-ad16-4c39-8885-97dbd0f306d8').then(res => console.log(res));
          })
          .catch(() => {
            this.$store.dispatch('signOut').then();
            this.$router.push({name: 'login'});

            this.clearLoading();
          });
      } else {
        this.clearLoading();

        this.$router.push({name: 'login'});

        signIn({email: 'jane@vet.com', password: 'jane'}).then(res => {
          getCustomers('sdfdf').then(res => console.log(res));
          this.$store.commit('setSelf', res.user)
        });
      }
    }

  }
</script>

<style lang="scss">
  @import "app";
</style>