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
    },
    addPatientType(state, patientType){
      state.values.push(patientType);
    },
    updatePatientType(state, patientType){
      state.values = state.values.map(c => {
        return (c.id === patientType.id) ? patientType : c;
      });
    }

  },
  state: {
    values: []
  }
}