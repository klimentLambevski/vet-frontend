import VueRouter from 'vue-router';
import Users from './components/users/users.vue';
import GraphQl from './components/graphql/graphql.vue';
import Patients from './components/patients/patients.vue';
import PatientType from './components/patient-types/patient-types.vue';
import Examination from './components/examination/examination.vue';
import Immunization from './components/immunizations/immunizations.vue';

const routes = [
  {
    path: '/',
    redirect: '/users'
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  },

  {
    path: '/customer/:customerId',
    name: 'customer',
    component: Patients,
    props: true
  },
  {
    path: '/patient/:patientId',
    name: 'patient',
    component: Examination,
    props: true
  },

  {
    path: '/patient-types',
    name: 'patientTypes',
    component: PatientType,
  },
  {
    path: '/patient-type/:patientTypeId',
    name: 'immunizations',
    component: Immunization,
    props: true
  },
  {
    path: '/graphql',
    component: GraphQl
  }

];


export const router = new VueRouter({
  routes
});
