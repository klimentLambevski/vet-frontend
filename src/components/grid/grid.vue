<template>

    <div class="grid">

        <v-data-table
                v-model="selected"
                v-bind:headers="headers"
                v-bind:items="items"
                select-all
                v-bind:pagination.sync="pagination"
                item-key="name"
                class="elevation-1"
        >

            <template slot="headers" slot-scope="props">
                <tr>
                    <th v-for="header in props.headers" :key="header.text"
                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                        @click="changeSort(header.value)"
                    >
                        <v-icon class="cyan--text text--darken-3">arrow_upward</v-icon>
                        {{ header.text }}
                    </th>
                    <th>Акции</th>
                </tr>
            </template>
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.fat }}</td>
                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                    <td class="text-xs-right">{{ props.item.protein }}</td>
                    <td class="text-xs-right">{{ props.item.sodium }}</td>
                    <td class="text-xs-right">{{ props.item.calcium }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                    <td> <v-menu bottom left>
                        <v-btn icon slot="activator" >
                            <v-icon>more_horiz</v-icon>
                        </v-btn>
                        <v-list>
                            <v-list-tile >
                                <v-list-tile-title>Измени</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile >
                                <v-list-tile-title>Избриши</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu></td>
                </tr>
            </template>
        </v-data-table>

    </div>

</template>

<script>
    export default {

        data() {
            return {
                selected: [],
                pagination: Object
            }
        },
        props: {
            headers: Array,
            items: Array,
            paginationConfig: Object
        },
        methods: {
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column;
                    this.pagination.descending = false
                }
            }
        },
        created() {
            this.pagination = this.paginationConfig;
        }
    }
</script>

<style lang="scss">
    @import 'grid';
</style>