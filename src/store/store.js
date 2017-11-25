import Vue from 'vue';
import Vuex from 'vuex';

import self from './modules/self';
import patientTypes from './modules/patient-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    self,
    patientTypes
  },
  strict: debug,
})
