import VueRouter from 'vue-router';

const token = sessionStorage.getItem('token');

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component() {
      return token ? import('../views/dashboard.vue') : import('../views/login.vue');
    },
    meta: {
      title: 'Inventory - Dashboard',
      requireAuth: false,
    },
    props: true,
  },
  {
    name: 'Item',
    path: '/item',
    component: () => import('../views/item.vue'),
    meta: {
      title: 'Inventory - Item',
      requireAuth: true,
    },
    props: true,
  },
  {
    name: 'Loan',
    path: '/loan',
    component: () => import('../views/loan.vue'),
    meta: {
      title: 'Inventory - Loan',
      requireAuth: true,
    },
    props: true,
  },
  {
    name: 'NotFound',
    path: '*',
    component: () => import('../views/notfound.vue'),
    meta: {
      title: 'Inventory - Opss. 404',
      requireAuth: false,
    },
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  if (to.meta.requireAuth) {
    if (!token) {
      window.location.href = '/';
    }
  }
  next();
});

export default router;
