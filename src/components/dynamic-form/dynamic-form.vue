<template>

  <v-form ref="form" class="dynamic-from">

    <h5>{{ formName }}</h5>

    <div v-for="(column, key) in formConfig.columns">

      <v-text-field
        :label="column.label"
        :rules="column.rules"
        :type="column.type"
        v-if="column.type=='text' || column.type =='number'"
        v-model="formValues[key]"
        required
      ></v-text-field>


      <v-select
        :label="column.label"
        :rules="column.rules"
        v-model="formValues[key]"
        v-if="column.type=='dropdown'"
        :items="column.values"
        :item-text="'name'"
        :item-value="'name'"

      >
      </v-select>

      <v-checkbox
        :label="column.label"
        :rules="column.rules"
        v-model="formValues[key]"
        v-if="column.type=='checkbox'"
      ></v-checkbox>

      <v-radio-group v-model="formValues[key]" v-if="column.type=='radio'">
        <v-radio v-for="value in column.values" :label="value.name" :value="value.value"></v-radio>
      </v-radio-group>

      <date-picker
        v-if="column.type=='date'"
        v-model="formValues[key]"
        @input="onDateChange"
      ></date-picker>
    </div>

    <p class="validation-message" v-for="message in validationMessages"> {{ message }} </p>

    <div class="form-actions">
      <v-btn @click="close" v-if="formConfig.showCancelButton"> {{ formConfig.cancelButtonName }}</v-btn>

      <v-btn class="brand-btn" @click="submit" color="primary">
        {{ buttonName }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
  import * as _ from 'lodash';
  import DatePicker from '../date-picker/date-picker.vue';

  export default {
    components: {
      DatePicker
    },
    data: () => ({
      formValues: {},
      formConfig: {},
      validationMessages: [],
      formName: '',
      buttonName: '',
    }),
    props: {
      config: {},
      values: {},
      onSubmit: {},
    },
    methods: {
      close() {
        this.$emit('cancel');
      },
      submit() {
        if (!_.isUndefined(this.onSubmit)) {
          if (this.$refs.form.validate()) {
            this.onSubmit(this.formValues).then(response => {
              this.$emit('form-submitted', {clientValues: this.formValues, serverValues: response})
            })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            console.log("Form invalid");
          }
        } else {
          console.log("Submit method not defined");
        }
      },
      onDateChange(data){
        console.log(data);
      }
    },
    created() {

      this.formConfig = _.clone(this.config);

      if (this.values && this.values.id) {
        this.formValues = _.clone(this.values);
        this.formName = this.config.editName;
        this.buttonName = this.config.editButtonName;
      } else {
        this.formName = this.config.createName;
        this.buttonName = this.config.createButtonName;
      }

    }

  }

</script>

<style lang="scss">
  @import "dynamic-from";
</style>