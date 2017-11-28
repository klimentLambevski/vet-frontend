<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div id="app">

      <login v-if="!this.self"></login>

      <div class="view-content" v-else>
        <main-header></main-header>
        <div class="content">
          <router-view></router-view>
        </div>
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
  import {EventBus} from "../../services/event-bus";

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
          })
          .catch(() => {
            this.$store.dispatch('signOut');
            this.clearLoading();
          });
      } else {
        this.clearLoading();
      }

      EventBus.$on('Authorized', () => {
        this.$store.dispatch('getPatientTypes');
      })
    }

  }
</script>

<style lang="scss">
  @import "app";
</style>