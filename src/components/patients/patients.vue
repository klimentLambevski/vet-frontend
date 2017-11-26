<template>
  <div id="patients">

    <div class="customer-info">{{ customer.user.name }} {{ customer.user.surname }}
      <v-btn fab dark small color="primary" @click="showCustomerModal=true">
        <v-icon dark>edit</v-icon>
      </v-btn>
    </div>

    <grid :config="patientsGridConfig"
          :items="customer.patients"
          @open-modal="openModal"
          @row-selected="onRowSelected"
    ></grid>

    <v-dialog v-if="showModal" v-model="showModal" max-width="500px">
      <v-card>
        <v-card-text>
          <dynamic-form
            :on-submit="onPatientSubmit"
            :config="patientsFormConfig"
            :values="patient"
            @form-submitted="onPatientFormSubmitted"
          ></dynamic-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-if="showCustomerModal" v-model="showCustomerModal" max-width="500px">
      <v-card>
        <v-card-text>
          <dynamic-form
            :on-submit="onCustomerSubmit"
            :config="customerFormConfig"
            :values="customer.user"
            @form-submitted="onCustomerFormSubmitted"
          ></dynamic-form>
        </v-card-text>
      </v-card>
    </v-dialog>


  </div>
</template>
<script>

  import {mapState} from 'vuex';
  import DynamicForm from '../dynamic-form/dynamic-form.vue';
  import Grid from '../grid/grid.vue';
  import {getCustomerFormConfig} from "../../services/ui/customer";
  import {getCustomer, updateCustomer} from "../../services/customer";
  import {getPatientFormConfig, getPatientGridConfig} from "../../services/ui/patient";
  import {createPatient, updatePatient} from "../../services/patients";
  import {getPatientTypes} from "../../services/patient-types";

  export default {
    components: {
      DynamicForm,
      Grid
    },
    data: () => ({
      customer: {user: {}},
      customerFormConfig: {},
      patientsGridConfig: {},
      patient: null,
      showModal: false,
      showCustomerModal: false,
    }),
    computed: {
      ...mapState({
        patientTypes: state => state.patientTypes.values.map(({name}) => ({name}))
      })
    },
    props: {
      customerId: null
    },
    created() {
      this.customerFormConfig = getCustomerFormConfig;

      getCustomer(this.customerId).then(response => {
        this.customer = response.customer;
        this.patientsGridConfig = getPatientGridConfig;
        this.patientsFormConfig = getPatientFormConfig;
        this.patientsFormConfig.columns.type.values = this.patientTypes;
      });
    },
    methods: {
      onPatientSubmit(patient) {
        if (patient.id) {
          return updatePatient(patient, this.patient.id);
        } else {
          return createPatient(patient, this.customer.id);
        }
      },
      onPatientFormSubmitted({serverValues: {patient}}) {
        if (this.patient) {
          this.customer.patients = this.customer.patients.map(c => {
            return (c.id === patient.id) ? patient : c;
          });
        } else {
          console.log("New patient", patient);
          this.customer.patients.push(patient);
        }
        this.showModal = false;
      },
      openModal({item, action}) {
        if (item != null) {
          this.patient = item;
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
      onRowSelected(item) {
        this.$router.push({name: 'patient', params: {patientId: item.id}});
      },
      onCustomerSubmit(user) {
        return updateCustomer({user}, this.customer.id);
      },
      onCustomerFormSubmitted({serverValues: {customer}}) {
        this.customer = customer;
        this.showCustomerModal = false;
      }
    }
  }
</script>

<style lang="scss">
  @import "patients";
</style>

