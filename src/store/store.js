import Vue from 'vue';
import Vuex from 'vuex';

import self from './modules/self';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    self
  },
  strict: debug,
})
