import VueRouter from 'vue-router';
import Notfound from '../views/notfound.vue';

const token = sessionStorage.getItem('token');

const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component() {
      return !token ? Notfound : import('../views/dashboard.vue');
    },
    meta: {
      title: !token ? 'Oopss. 404' : 'Dashboard',
    },
    props: true,
  },
  {
    name: 'Commodity',
    path: '/commodity',
    component() {
      return !token ? Notfound : import('../views/commodity.vue');
    },
    meta: {
      title: !token ? 'Oopss. 404' : 'Commodity',
    },
    props: true,
  },
  {
    name: 'Loan',
    path: '/loan',
    component() {
      return !token ? Notfound : import('../views/loan.vue');
    },
    meta: {
      title: !token ? 'Oopss. 404' : 'Loan',
    },
    props: true,
  },
  {
    name: 'NotFound',
    path: '*',
    component: () => import('../views/notfound.vue'),
    meta: { title: 'Opss. 404' },
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
