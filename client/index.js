import Vue from 'vue';
import VueRouter from 'vue-router';
import Fragment from 'vue-fragment';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

import router from './router/index';
import App from './app.vue';
import store from './store/index';

Vue.use(VueRouter);
Vue.use(Fragment.Plugin);
Vue.use(VueApollo);

Vue.config.errorHandler = (err) => {
  console.log(err.message);
};

const isDev = process.env.NODE_ENV === 'development';
const apolloClient = new ApolloClient({
  uri: isDev ? 'http://localhost:8000/graphql' : '/graphql',
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  render: (element) => element(App),
  router,
  store,
  apolloProvider,
}).$mount('#root');
