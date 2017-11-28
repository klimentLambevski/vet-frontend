<template>
  <div id="examination">

    <div class="patient-info">
      {{ patient.name }}
      <v-btn fab dark small color="primary" @click="showPatientModal=true">
        <v-icon dark>edit</v-icon>
      </v-btn>
    </div>

    <grid :config="examinationsGridConfig"
          :items="patient.examinations"
          @open-modal="openModal"
          @row-selected="onRowSelected"
    ></grid>

    <v-dialog v-if="showPatientModal" v-model="showPatientModal" max-width="500px">
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

    <v-dialog v-if="showModal" v-model="showModal" max-width="500px">
      <v-card>
        <v-card-text>
          <dynamic-form
            :on-submit="onExaminationSubmit"
            :config="examinationFormConfig"
            :values="examination"
            @form-submitted="onExaminationFormSubmitted"
          ></dynamic-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import {getPatient, updatePatient} from "../../services/patients";
  import {getPatientFormConfig} from "../../services/ui/patient";
  import Grid from '../grid/grid.vue';
  import DynamicForm from '../dynamic-form/dynamic-form.vue';
  import {getExaminationFormConfig, getExaminationGridConfig} from "../../services/ui/examination";
  import {createExamination, updateExamination} from "../../services/examinations";

  export default {
    components: {
      DynamicForm,
      Grid
    },
    data: () => ({
      patient: {},
      examination: {},
      patientsFormConfig: {},
      examinationFornConfig: {},
      examinationsGridConfig: {},
      showModal: false,
      showPatientModal: false,
    }),
    props: {
      patientId: null
    },
    computed: {
      ...mapState({
        patientTypes: state => state.patientTypes.values
      })
    },
    methods: {
      onPatientSubmit(patient) {
        return updatePatient(patient, this.patient.id);
      },
      onPatientFormSubmitted({serverValues: {patient}}) {
        this.patient = patient;
        this.showPatientModal = false;
      },
      onExaminationSubmit(examination) {
        if (examination.id) {
          return updateExamination(examination, examination.id);
        } else {
          return createExamination(examination, this.patient.id);
        }
      },
      onExaminationFormSubmitted({serverValues: {examination}}) {
        if (this.examination.id) {
          this.patient.examinations = this.patient.examinations.map(c => {
            return (c.id === examination.id) ? examination : c;
          });
        } else {
          this.patient.examinations.push(examination);
        }
        this.examination = {};
        this.showModal = false;
      },
      onRowSelected() {

      },
      openModal({item, action}) {
        if (item !== null) {
          this.examination = item;
        } else {
          this.examination = {};
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
    },
    created() {
      getPatient(this.patientId).then(response => {
        this.patient = response.patient;
        let patientType = this.patientTypes.find(pt => pt.name === this.patient.type.name );
        this.examinationFormConfig.columns.immunizationId.values = patientType && patientType.immunizations;
      });

      this.examinationsGridConfig = getExaminationGridConfig;
      this.examinationFormConfig = getExaminationFormConfig;
      this.patientsFormConfig = getPatientFormConfig;
      this.patientsFormConfig.columns.type.values = this.patientTypes;


    },
    watch: {
      patientTypes() {
        this.patientsFormConfig.columns.type.values = this.patientTypes;
        if(this.patient.id) {
          let patientType = this.patientTypes.find(pt => pt.name === this.patient.type.name );
          this.examinationFormConfig.columns.immunizationId.values = patientType && patientType.immunizations;
        }
      }
    }
  }

</script>