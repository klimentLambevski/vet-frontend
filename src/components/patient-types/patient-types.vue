<template>
  <div id="patient-types">

    <grid :config="patientTypesGridConfig"
          :items="patientTypes"
          @open-modal="openModal"
          @row-selected="onRowSelected"
    ></grid>

    <v-dialog v-if="showModal" v-model="showModal" max-width="500px">
      <v-card>
        <v-card-text>
          <dynamic-form
            :on-submit="onPatientTypeSubmit"
            :config="patientTypesFormConfig"
            :values="patientType"
            @form-submitted="onPatientTypeFormSubmitted"
          ></dynamic-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>

  import {mapState} from 'vuex';
  import store from '../../store/store';
  import Grid from '../grid/grid.vue';
  import DynamicForm from '../dynamic-form/dynamic-form.vue';
  import {getPatientTypeGridConfig, getPatientTypeFormConfig} from "../../services/ui/patientType";
  import {createPatientType, updatePatientType} from "../../services/patient-types";

  export default {
    components: {
      Grid,
      DynamicForm
    },
    data: () => ({
      showModal:false,
      patientType: {},
      patientTypesGridConfig: {},
      patientTypesFormConfig: {},
    }),
    computed: {
      ...mapState({
        patientTypes: state => state.patientTypes.values
      })
    },
    created() {
      this.patientTypesGridConfig = getPatientTypeGridConfig;
      this.patientTypesFormConfig = getPatientTypeFormConfig;
    },
    methods: {
      openModal({item, action}) {
        if (item != null) {
          console.log("yeye");
          this.patientType = item;
        }
        switch (action) {
          case 'create':
            this.showModal = true;
            break;
          case 'edit':
            console.log("yeye");
            this.showModal = true;
            break;
          case 'delete':
            alert("Ne se brishe korisnik");
            break;
          default:
            console.log("Invalid command");
        }
      },
      onRowSelected(item) {
        this.$router.push({name: 'immunizations', params: {patientTypeId: item.id}});
      },
      onPatientTypeSubmit(patientType) {
        if (patientType.id) {
          return updatePatientType(patientType, patientType.id);
        } else {
          return createPatientType(patientType);
        }
      },
      onPatientTypeFormSubmitted({serverValues: {patientType}}) {
        if (this.patientType.id) {
          store.commit('updatePatientType', patientType);
        } else {
          store.commit('addPatientType', patientType);
        }
        this.showModal = false;
      }
    }
  }
</script>
<style lang="scss">

</style>