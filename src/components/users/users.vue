<template>
  <div id="users">
    
    <div class="section-title">
      <span>Корисници</span>
      <v-btn flat fab color="cyan darken-3" class="create-btn" @click.stop="showModal = !showModal">
        <v-icon>add_box</v-icon>
      </v-btn>
    </div>

    <grid :config="tableConfig"
          :items="customers"
          @open-modal="openModal"
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

  export default {
    components: {
      Grid,
      DynamicForm
    },
    data: () => ({
      showModal: false,
      valid: false,
      customer: {user: {}},
      customerFormConfig: {
        formName: 'Креирај нов корисник',
        columns: {
          'name': {
            type: 'text',
            label: 'Име',
            rules: [
              (v) => !!v || 'Името е задолжително',
            ]
          },
          'surname': {
            type: 'text',
            label: 'Презиме',
            rules: [
              (v) => !!v || 'Презимето е задолжително',
            ]
          },
          'email': {
            type: 'text',
            label: 'Е-маил',
            rules: [
              (v) => !!v || 'Е-маилот е задолжителен',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Е-маилот мора да е валиден'
            ]
          },
        },
        confirmButtonName: 'Креирај'
      },
      tableConfig: {
        headers: [
          {text: 'Email', value: 'user.email'},
          {text: 'Name', value: 'user.name'},
          {text: 'Surname', value: 'user.surname'},
        ],
        pagination: {
          sortBy: 'name'
        },
      },
      customers: [],

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
        this.customer = item;
        switch (action) {
          case 'edit':
            this.showModal = true;
            break;
          case 'delete':
            alert("Ne se brishe korisnik");
            break;
          default:
            console.log("Invalid command");
        }
      }
    },
    created() {
      getCustomers().then(response => {
        this.customers = response.customers;
      })
    }
  }
</script>

<style lang="scss">
  @import "users";
</style>