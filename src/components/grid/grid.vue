<template>

  <div class="grid">

    <v-data-table
      v-model="selected"
      v-bind:headers="config.headers"
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
        <tr  @click="props.selected = !props.selected">
          <td v-for="header in config.headers"> {{ getItem(props.item, header.value)  }}</td>
          <td>
            <v-menu bottom left>
              <v-btn icon slot="activator">
                <v-icon>more_horiz</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title>Измени</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>Избриши</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </template>
    </v-data-table>

  </div>

</template>

<script>


  import * as _ from "lodash";

  export default {

    data() {
      return {
        selected: [],
        pagination: Object
      }
    },
    props: {
      config: Object,
      items: Array,
    },
    methods: {
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false
        }
      },
      getItem(item, headerValue){
        return _.get(item, headerValue);
      }
    },
    created() {
      this.pagination = this.config.pagination;
    }
  }
</script>

<style lang="scss">
  @import 'grid';
</style>