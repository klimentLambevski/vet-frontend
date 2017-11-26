import {getPatientTypes} from "../../services/patient-types";

export default {
  actions: {
    getPatientTypes({commit}) {
      getPatientTypes().then(res => {
        commit('setPatientTypes', res.patientTypes);
      })
    }
  },
  mutations: {
    setPatientTypes(state, patientTypes) {
      state.values = patientTypes;
    }
  },
  state: {
    values: []
  }
}