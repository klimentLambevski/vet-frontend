<template>
  <div class="input-array">
    <div>{{label}}</div>
    <div v-for="item in value">
      <div class="array-field">
        <v-text-field
          :label="fieldLabel"
          :rules="rules"
          :type="type"
          :required="required"
          v-model="item[fieldKey]"
        ></v-text-field>
        <div class="field-icon" @click="removeItem(item)">
            <v-icon >close</v-icon>
        </div>
      </div>
    </div>
    <div class="add-field">
      <v-btn fab dark small color="primary" @click="addField()">
        <v-icon dark>add</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>


  export default {
    components: {},
    data: () => ({

    }),
    props: {
      value: {},
      fieldKey: {}, //item[key] this component is sub form with array of objects
      label: {},
      fieldLabel: {},
      rules: {},
      type: {},
      required: {}
    },
    created() {

    },
    methods: {
      addField() {
        if(this.value) {
          this.$emit('input', [...this.value, {
            [this.fieldKey]: undefined
          }])
        } else {
          this.$emit('input', [{[this.fieldKey]: undefined}])
        }
      },
      removeItem(item) {
        this.$emit('input', this.value.filter(v => v !== item));
      }
    }
  }
</script>
<style lang="scss">
  @import "input-array";
</style>