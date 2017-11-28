<template>

  <v-menu
    lazy
    :close-on-content-click="false"
    v-model="menu"
    transition="scale-transition"
    offset-y
    full-width
    :nudge-right="40"
    max-width="290px"
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      label="Picker in menu"
      v-model="pickerDisplayVal"
      prepend-icon="event"
      readonly
    ></v-text-field>

    <v-date-picker v-model="pickerValue" no-title scrollable actions @input="onDateChange">
      <template slot-scope="{ save, cancel }">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
          <v-btn flat color="primary" @click="save()">OK</v-btn>
        </v-card-actions>
      </template>
    </v-date-picker>
  </v-menu>

</template>

<script>
  import * as _ from "lodash";
  import {formatDate} from "../../services/utils/date";

  export default {
    data: () => ({
      menu: null,
      pickerValue: null,
      pickerDisplayVal: null
    }),
    props: {
      value: null
    },
    created(){
      this.pickerValue = _.clone(this.value);
      this.pickerDisplayVal = this.value && formatDate(new Date(this.value));
    },
    methods: {
      onDateChange(){
        this.$emit('input',  new Date(this.pickerValue).toISOString())
      }
    },
    watch: {
      pickerValue() {
        this.pickerDisplayVal = this.pickerValue && formatDate(new Date(this.pickerValue));
      }
    }
  }

</script>