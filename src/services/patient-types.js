import {graphql, handleMutation} from "./gateway";
import * as _ from "lodash";

export const getPatientTypes = () => graphql`
  query getAllPatientTypes {
    patientTypes {
      name
    }
  }
`();

export const createPatientType = (patientType) => handleMutation(graphql`
  mutation addPatientType($patientType: PatientTypeInput!){
    createPatientType(patientType: $patientType) {
      errors {
        message
      }
      patientType {
        id
        name
        immunizations {
          createdAt
          description
          id
          name
          periods {
            id
            month
          }
        }
      }
    }
  }
`({ patientType }), 'createPatientType');

export const updatePatientType = (patientType, patientTypeId) => handleMutation(graphql`
  mutation editPatientType($patientType: PatientTypeInput!, $patientTypeId: String!){
    updatePatientType(patientType: $patientType, patientTypeId: $patientTypeId) {
      errors {
        message
      }
      patientType {
        id
        name
        immunizations {
          createdAt
          description
          id
          name
          periods {
            id
            month
          }
        }
      }
    }
  }
`({ patientType: _.pick(patientType, ['name']), patientTypeId}), 'updatePatientType');