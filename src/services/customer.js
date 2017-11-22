
import {graphql} from "./gateway";

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