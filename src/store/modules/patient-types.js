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
    },
    addImmunization(state, {patientType, immunization}) {
      let pt = state.values.find(v => v.id === patientType.id);
      pt.immunizations = [...pt.immunizations, immunization];
    },
    updateImmunization(state,  {patientType, immunization}) {
      console.log(immunization);
      let pt = state.values.find(v => v.id === patientType.id);
      pt.immunizations = [...pt.immunizations.map((i) => {
        if(i.id === immunization.id) {
          return immunization;
        } else {
          return i;
        }
      })];
      console.log(pt);
    }

  },
  state: {
    values: []
  }
}