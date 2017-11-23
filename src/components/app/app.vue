<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div id="app">

      <login v-if="!this.self"
              @user-logged-in=""></login>

      <div class="view-content" v-else>
        <main-header></main-header>
        <router-view></router-view>
      </div>

    </div>
  </div>

</template>

<script>

  import {mapState} from 'vuex';

  import store from '../../store/store';

  import MainHeader from '../main-header/main-header.vue';
  import Login from '../login/login.vue';
  import {initToken, signIn} from "../../services/auth";
  import {globalState} from "../../store/global";
  import Loading from '../loading/loading.vue';
  import {getCustomer, getCustomers} from "../../services/customer";

  export default {
    store,
    components: {
      MainHeader,
      Loading,
      Login
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
    computed: {
      ...mapState({
        self: state => state.self.user
      })
    },
    created() {

      initToken();

      if (globalState.token) {
        this.$store.dispatch('checkAuth')
          .then(() => {
            this.clearLoading();
            this.$router.push({name: 'users'});
          //  getCustomers('7ca552c4-ad16-4c39-8885-97dbd0f306d8').then(res => console.log(res));
          })
          .catch(() => {
            this.$store.dispatch('signOut');
            this.$router.push({name: 'login'});

            this.clearLoading();
          });
      } else {
        this.clearLoading();

      }
    }

  }
</script>

<style lang="scss">
  @import "app";
</style>