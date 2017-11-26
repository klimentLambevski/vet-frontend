import VueRouter from 'vue-router';
import Users from './components/users/users.vue';
import GraphQl from './components/graphql/graphql.vue';
import CustomerInfo from './components/customer-info/customer-info.vue';

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
    component: CustomerInfo,
    props: true
  },
  {
    path: '/graphql',
    component: GraphQl
  }

]


export const router = new VueRouter({
  routes
});
