import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from './components/app/app.vue';

require('./index.scss');
require('vuetify/dist/vuetify.css');

import {router} from "./routes.js";

Vue.use(Vuetify);
Vue.use(VueRouter);

new Vue({
  router,
  components: {
    App
  },
  template: '<app></app>'

}).$mount('#r-boot');