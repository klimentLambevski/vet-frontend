<template>

    <v-form ref="form" class="dynamic-from">

        <h5>{{ config.formName }}</h5>

        <div v-for="(column, key) in config.columns">

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
            ></v-select>

            <v-checkbox
                    :label="column.label"
                    :rules="column.rules"
                    v-model="formValues[key]"
                    v-if="column.type=='checkbox'"
            ></v-checkbox>

            <v-menu
                    lazy
                    :close-on-content-click="false"
                    v-model="menu"
                    v-if="column.type=='date'"
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
                        v-model="formValues[key]"
                        prepend-icon="event"
                        readonly
                ></v-text-field>
                <v-date-picker v-model="formValues[key]" no-title scrollable actions>
                    <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                            <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                    </template>
                </v-date-picker>
            </v-menu>

        </div>

        <p class="validation-message" v-for="message in validationMessages"> {{ message }} </p>

        <div class="form-actions">
            <v-btn @click="close">Clear</v-btn>

            <v-btn class="cyan darken-3 save-btn" @click="submit">
                Save
            </v-btn>
        </div>


    </v-form>

</template>


<script>

    import * as _ from 'lodash';

    export default {
        data: () => ({
            formValues: {
                date: null
            },
            validationMessages: [],
            menu : null,
        }),
        props: {
            config: {},
            onSubmit: {},
            validate: {},
        },
        methods: {
            close() {
                this.$emit('cancel');
            },
            submit() {
                if (!_.isUndefined(this.onSubmit)) {
                    if (this.$refs.form.validate()) {
                        this.onSubmit().then(response => {
                            if (response.success) {
                                this.$emit('form-submitted', this.formValues)
                            }
                        });
                    } else {

                    }
                } else {
                    console.log("Submit method not defined");
                }
            }
        }

    }

</script>

<style lang="scss">
    @import "dynamic-from";
</style>