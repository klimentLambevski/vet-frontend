<template>
  <div id="immunizations">

    <grid :config="immunizationsGridConfig"
          :items="immunizations"
          @open-modal="openModal"
          @row-selected="onRowSelected"
    ></grid>

    <v-dialog v-if="showModal" v-model="showModal" max-width="500px">
      <v-card>
        <v-card-text>
          <dynamic-form
            :on-submit="onImmunizationSubmit"
            :config="immunizationsFormConfig"
            :values="immunization"
            @form-submitted="onImmunizationFormSubmitted"
          ></dynamic-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Grid from '../grid/grid.vue';
  import DynamicForm from '../dynamic-form/dynamic-form.vue';
  import {getImmunizationFormConfig, getImmunizationGridConfig} from "../../services/ui/immunization";
  import {getPatientTypes} from "../../services/patient-types";
  import {createImmunization, updateImmunization} from "../../services/immunizations";

  export default {
    components: {
      DynamicForm,
      Grid
    },
    props: {
      patientTypeId: null
    },
    data: () => ({
      showModal: false,
      immunization: {},
      immunizationsGridConfig: {},
      immunizationsFormConfig: {}
    }),
    computed: {
      ...mapState({
        immunizations(state) {
          let patientType = state.patientTypes.values.find(pt => pt.id === this.patientTypeId);
          console.log(patientType);
          if(patientType) {
            return patientType.immunizations;
          } else {
            return [];
          }
        },
        patientType(state) {
          return state.patientTypes.values.find(pt => pt.id === this.patientTypeId);
        }
      })
    },
    methods: {
      openModal({item, action}) {
        if (item != null) {
          this.immunization = item;
        }
        switch (action) {
          case 'create':
            this.showModal = true;
            break;
          case 'edit':
            this.showModal = true;
            break;
          case 'delete':
            alert("Ne se brishe korisnik");
            break;
          default:
            console.log("Invalid command");
        }
      },
      onRowSelected() {

      },
      onImmunizationSubmit(immunization) {

        if (immunization.id) {
             return updateImmunization(immunization, immunization.id);
        } else {
             return createImmunization(immunization, this.patientType.id);
        }
      },
      onImmunizationFormSubmitted({serverValues: {immunization}}) {
        if (this.immunization && this.immunization.id) {
          this.$store.commit('updateImmunization', {patientType: this.patientType, immunization});
        } else {
          this.$store.commit('addImmunization', {patientType: this.patientType, immunization});
        }
        this.immunization = {};
        this.showModal = false;
      }
    },
    created() {

      this.immunizationsGridConfig = getImmunizationGridConfig;
      this.immunizationsFormConfig = getImmunizationFormConfig;

    }

  }

</script>

