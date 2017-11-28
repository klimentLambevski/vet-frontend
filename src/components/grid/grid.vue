<template>

  <div class="grid">
    <v-card-title>

      <div class="section-title">
        <span>{{ config.gridName }}</span>
        <v-btn fab dark small color="primary" @click.stop="openModal(null, 'create')">
          <v-icon dark>add</v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>

    <v-data-table
      v-model="selected"
      select-all
      item-key="name"
      class="elevation-1"
      :headers="config.headers"
      :items="gridData"
      :pagination.sync="pagination"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)">
            <v-icon class="cyan--text text--darken-3">arrow_upward</v-icon>
            {{ header.text }}
          </th>
          <th>Акции</th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr @click="rowSelected( props.item)">
          <td v-for="header in config.headers"> {{ getItem(props.item, header.value, header.type) }}</td>
          <td @click="$event.stopPropagation();">
            <v-menu bottom left>
              <v-btn icon slot="activator">
                <v-icon>more_horiz</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="action, key in config.actions"  :key="key">
                  <v-list-tile-title>
                    <a @click="openModal(props.item, key)">{{ action.label }}</a>
                  </v-list-tile-title>
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

  function formatDate(date) {
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  import * as _ from "lodash";

  export default {

    data() {
      return {
        selected: [],
        pagination: Object,
        search: null
      }
    },
    props: {
      config: Object,
      items: Array,
    },
    computed: {
      gridData() {
        if (this.search) {
          let startWithArr = [];
          let containsArr = [];
          _.each(this.items, (item) => {
            let startsWith = false;
            let contains = false;
            _.each(this.config.headers, (header) => {
              try {
                let val = _.get(item, header.value);
                startsWith = val && val.startsWith(this.search);
                contains = val && val.includes(this.search);

              } catch (ex) {}
            });
            if (startsWith) {
              startWithArr.push(item);
            } else if (contains) {
              containsArr.push(item);
            }
          });
          return startWithArr.concat(containsArr);
        } else {
          return this.items;
        }
      }
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
      getItem(item, headerValue, type) {
        if(type === 'date') {
          let d = _.get(item, headerValue);
          return formatDate(new Date(d));

        } else {
          return _.get(item, headerValue);
        }
      },
      openModal(item, action) {
        this.$emit('open-modal', {item, action});
      },
      rowSelected(item) {
        this.$emit('row-selected', item);
      }
    },
    created() {
      this.pagination = _.defaults({
        rowsPerPage: 25
      }, this.config.pagination);
    }
  }
</script>

<style lang="scss">
  @import 'grid';
</style>