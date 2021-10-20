import VueRouter from 'vue-router';

const token = sessionStorage.getItem('token');

const routes = [
  {
    name: token ? 'Dashboard' : 'Login',
    path: '/',
    component() {
      return token ? import('../views/dashboard.vue') : import('../views/login.vue');
    },
    meta: {
      title: `Inventory - ${token ? 'Dashboard' : 'Login'}`,
      requireAuth: false,
      lockedAtLogin: token === null,
    },
    props: true,
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('../views/register.vue'),
    meta: {
      title: 'Inventory - Register',
      requireAuth: false,
      lockedAtLogin: true,
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
      lockedAtLogin: false,
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
      lockedAtLogin: false,
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
      lockedAtLogin: false,
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

  if (to.meta.lockedAtLogin) {
    if (token) {
      window.location.href = '/';
    }
  }

  next();
});

export default router;
