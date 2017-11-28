import {graphql, handleMutation} from "./gateway";
import * as _ from "lodash";

export const createImmunization = (immunization, patientTypeId) => handleMutation(graphql`
  mutation addImmunization($immunization: ImmunizationInput!, $patientTypeId: String!) {
    createImmunization(immunization: $immunization, patientTypeId: $patientTypeId) {
      errors {
        message
        path
        type
        value
      }
      immunization {
        createdAt
        description
        id
        name
        typeId
        periods {
          month
          id
        }
      }

    }
  }
`({ immunization: _.pick(immunization, ['name', 'description', 'periods']), patientTypeId }), 'createImmunization');


export const updateImmunization = (immunization) => handleMutation(graphql`
  mutation updateImmunization($immunization: ImmunizationInput!, $immunizationId: String!) {
    updateImmunization(immunization: $immunization, immunizationId: $immunizationId) {
      errors {
        message
        path
        type
        value
      }
      immunization {
        createdAt
        description
        id
        name
        typeId
        periods {
          month
          id
        }
      }

    }
  }
`({ immunization: {
  ..._.pick(immunization, ['name', 'description']),
  periods: _.map(immunization.periods, period => ({month: period.month}))
}, immunizationId: immunization.id }), 'updateImmunization');