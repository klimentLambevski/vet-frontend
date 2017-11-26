<template>
  <div id="patient-types">
hvhvhvj
    <grid :config="patientTypesGridConfig"
          :items="patientTypes"
          @open-modal="openModal"
          @row-selected="onRowSelected"
    ></grid>

  </div>
</template>
<script>

  import {mapState} from 'vuex';
  import Grid from '../grid/grid.vue';
  import {getPatientTypeGridConfig} from "../../services/ui/patientType";

  export default {
    components: {
      Grid
    },
    data: () => ({
      patientTypesGridConfig: {}
    }),
    computed: {
      ...mapState({
        patientTypes: state => state.patientTypes.values.map(({name}) => ({name}))
      })
    },
    created() {
      this.patientTypesGridConfig = getPatientTypeGridConfig;
    },
    methods: {
      openModal() {

      },
      onRowSelected() {

      }

    }


  }
</script>
<style lang="scss">

</style>