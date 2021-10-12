import Vue from 'vue';
import VueRouter from 'vue-router';
import Fragment from 'vue-fragment';

import router from './router/index';
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Fragment.Plugin);

Vue.config.errorHandler = (err) => {
  console.log(err.message);
};

new Vue({
  render: (element) => element(App),
  router,
}).$mount('#root');
