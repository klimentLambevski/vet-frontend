<template>
    <div id="users">

        <div class="section-title">
            <span>Корисници</span>
            <v-btn flat fab color="cyan darken-3" class="create-btn" @click.stop="showModal = !showModal">
                <v-icon>add_box</v-icon>
            </v-btn>

        </div>

        <grid :headers="headers" :items="items" :pagination-object="pagination"></grid>

        <v-dialog v-model="showModal" max-width="500px">
            <v-card>

                <v-card-title>
                    <v-card-title class="headline cyan--text text--darken-3">Креирај нов корисник</v-card-title>
                    <v-spacer></v-spacer>
                </v-card-title>

                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field
                                label="Корисник"
                                v-model="user.name"
                                :rules="nameRules"
                                :counter="10"
                                required
                        ></v-text-field>
                        <v-text-field
                                label="Е-маил"
                                v-model="user.email"
                                :rules="emailRules"
                                required
                        ></v-text-field>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="cyan darken-3" flat @click.stop="showModal=false">Close</v-btn>
                    <v-btn color="cyan darken-3 save-btn"  @click.stop="showModal=false">Save</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

    </div>
</template>

<script>

    import Grid from '../grid/grid.vue';

    export default {

        components: {Grid},
        data: () => ({
            showModal: false,

            nameRules: [
                (v) => !!v || 'Името е задолжително',
            ],
            user: {},
            emailRules: [
                (v) => !!v || 'Е-маилот е задолжителен',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Е-маилот мора да е валиден'
            ],
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    value: 'name'
                },
                {text: 'Calories', value: 'calories'},
                {text: 'Fat (g)', value: 'fat'},
                {text: 'Carbs (g)', value: 'carbs'},
                {text: 'Protein (g)', value: 'protein'},
                {text: 'Sodium (mg)', value: 'sodium'},
                {text: 'Calcium (%)', value: 'calcium'},
                {text: 'Iron (%)', value: 'iron'}
            ],
            items: [
                {
                    value: false,
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    sodium: 87,
                    calcium: '14%',
                    iron: '1%'
                },
                {
                    value: false,
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    sodium: 129,
                    calcium: '8%',
                    iron: '1%'
                },
                {
                    value: false,
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    sodium: 337,
                    calcium: '6%',
                    iron: '7%'
                },
                {
                    value: false,
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    sodium: 413,
                    calcium: '3%',
                    iron: '8%'
                },
                {
                    value: false,
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    sodium: 327,
                    calcium: '7%',
                    iron: '16%'
                },
                {
                    value: false,
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    sodium: 50,
                    calcium: '0%',
                    iron: '0%'
                },
                {
                    value: false,
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    sodium: 38,
                    calcium: '0%',
                    iron: '2%'
                },
                {
                    value: false,
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    sodium: 562,
                    calcium: '0%',
                    iron: '45%'
                },
                {
                    value: false,
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    sodium: 326,
                    calcium: '2%',
                    iron: '22%'
                },
                {
                    value: false,
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    sodium: 54,
                    calcium: '12%',
                    iron: '6%'
                }
            ],
            pagination: {
                sortBy: 'name'
            },
            valid: false
        })
    }
</script>

<style lang="scss">
    @import "users";
</style>