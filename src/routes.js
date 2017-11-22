import VueRouter from 'vue-router';
import Login from './components/login/login.vue';
import Users from './components/users/users.vue';
import GraphQl from './components/graphql/graphql.vue';


const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/graphql',
    component: GraphQl
  }

]


export const router = new VueRouter({
  routes
});
