import VueRouter from 'vue-router';
import Login from './components/login/login.vue';
import Users from './components/users/users.vue';


const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/users',
    component: Users,
  },


]


export const router = new VueRouter({
  routes
});
