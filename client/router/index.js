import VueRouter from 'vue-router';

const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('../views/dashboard.vue'),
    meta: { title: 'Dashboard' },
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
