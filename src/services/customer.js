
import {graphql, handleMutation} from "./gateway";
import * as _ from "lodash";

export const getCustomers = () => graphql`
  query getCustomers{
    customers(order: "reverse:createdAt") {
      id
      user {
        id
        email
        name
        surname
        referral
      }
    }
  }`();

export const getCustomer = (customerId) => graphql`
  query getCustomer($id: String!) {
    customer(id: $id) {
      id
      user {
        id
        email
        name
        surname
        referral

      }
      patients(order: "reverse:createdAt") {
        id
        birthDate
        gender
        mbr
        microchip
        name
        race
        type {
          name
          immunizations {
            id
            name
            description
          }
        }
        createdAt
        updatedAt
      }
    }
  }`({id: customerId});

export const createCustomer = (customer) => handleMutation(graphql`
  mutation addCustomer($user: UserInput!){
    createCustomer(customer: {user: $user}) {
      errors {
        message
      }
      customer {
        id
        user {
          id
          email
          name
          surname
        }
      }
    }
  }
`({user: customer.user}), 'createCustomer');

export const updateCustomer = (customer, customerId) => handleMutation(graphql`
  mutation updateCustomer($user: UserInput!, $customerId: String!){
    updateCustomer(customer: {user: $user}, customerId: $customerId) {
      errors {
        message
      }
      customer {
        id
        user {
          id
          email
          name
          surname
        }
      }
    }
  }
`({user: _.pick(customer.user, ['email', 'name', 'surname']), customerId: customerId}), 'updateCustomer');