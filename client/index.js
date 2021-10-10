import Vue from 'vue';
import App from './app.vue';

new Vue({
  render: (element) => element(App),
}).$mount('#root');
