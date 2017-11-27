<template>
  <div id="immunizations">

    <grid :config="immunizationsGridConfig"
          :items="patientType.immunizations"
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
  import Grid from '../grid/grid.vue';
  import DynamicForm from '../dynamic-form/dynamic-form.vue';
  import {getImmunizationFormConfig, getImmunizationGridConfig} from "../../services/ui/immunization";

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
      patientType: {},
      immunization: {},
      immunizationsGridConfig: {},
      immunizationsFormConfig: {}
    }),
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
          //   return updateImmunization(immunization, immunization.id);
        } else {
          //   return createImmunization(immunization, this.patientType.id);
        }
      },
      onImmunizationFormSubmitted({serverValues: {immunization}}) {
        if (this.immunization) {
          this.patientType.immunizations = this.patientType.immunizations.map(c => {
            return (c.id === immunization.id) ? immunization : c;
          });
        } else {
          this.patientType.immunizations.push(immunization);
        }
        this.showModal = false;
      }
    },
    created() {
      getPatientType(this.patientTypeId).then(response => {
        this.patientType = response.patientType;
      });

      this.immunizationsGridConfig = getImmunizationGridConfig;
      this.immunizationsFormConfig = getImmunizationFormConfig;

    }

  }

</script>

