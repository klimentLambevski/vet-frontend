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

  import {mapState} from 'vuex';

  import store from '../../store/store';

  import MainHeader from '../main-header/main-header.vue';
  import {initToken, signIn} from "../../services/auth";
  import {globalState} from "../../store/global";
  import Loading from '../loading/loading.vue';

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
            this.$router.push({name: 'login'});

            this.clearLoading();
          });
      } else {
        this.clearLoading();

        this.$router.push({name: 'login'});

        signIn({email: 'jane@vet.com', password: 'jane'}).then(res => this.$store.commit('setSelf', res.user));
      }
    }

  }
</script>

<style lang="scss">
  @import "app";
</style>