import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    'counter/getUser': (state, payload) => {
      state.user = payload;
    },
  },
  actions: {
    'counter/getUser': (context, payload) => {
      context.commit('counter/getUser', payload);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
});

export default store;
