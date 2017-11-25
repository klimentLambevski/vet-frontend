<template>
  <div id="users">

    <grid :config="customerTableConfig"
          :items="customers"
          @open-modal="openModal"
          @row-selected="onRowSelected"
    ></grid>

    <v-dialog v-if="showModal" v-model="showModal" max-width="500px">
      <v-card>
        <v-card-text>
          <dynamic-form
            :on-submit="onSubmit"
            :config="customerFormConfig"
            :values="customer.user"
            @form-submitted="onFormSubmitted"
          ></dynamic-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import Grid from '../grid/grid.vue';
  import DynamicForm from '../dynamic-form/dynamic-form.vue';
  import {createCustomer, getCustomers, updateCustomer} from "../../services/customer";
  import {getCustomerFormConfig, getCustomerGridConfig} from "../../services/ui/customer";

  export default {
    components: {
      Grid,
      DynamicForm
    },
    data: () => ({
      showModal: false,
      valid: false,
      customer: {user: {}},
      customers: [],
      customerFormConfig: {},
      customerTableConfig: {},
    }),
    methods: {
      onSubmit(user) {
        if (this.customer.id) {
          return updateCustomer({user}, this.customer.id);
        } else {
          return createCustomer({user});
        }
      },
      onFormSubmitted({serverValues: {customer}}) {
        if (this.customer.id) {
          this.customers = this.customers.map(c => {
            return (c.id === customer.id) ? customer : c;
          });
        } else {
          this.customers.push(customer);
        }
        this.showModal = false;
      },
      openModal({item, action}) {
        if (item != null) {
          this.customer = item;
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
      onRowSelected(item){
        this.$router.push({name: 'customer', params: { id: item.id }});
      }
    },
    created() {
      this.customerFormConfig = getCustomerFormConfig;
      this.customerTableConfig = getCustomerGridConfig;
      getCustomers().then(response => {
        this.customers = response.customers;
      })
    }
  }
</script>

<style lang="scss">
  @import "users";
</style>