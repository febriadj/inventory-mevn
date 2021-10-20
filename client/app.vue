<template>
  <!-- use vue fragment -->
  <div>
    <navbar></navbar>
    <router-view v-if="everythingIsOke"></router-view>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';
import Navbar from './components/utils/navbar.vue';

export default {
  name: 'App',
  components: { Navbar },
  data() {
    return {
      everythingIsOke: false,
    }
  },
  methods: {
    async getUserData() {
      const token = sessionStorage.getItem('token');

      try {
        const user = await this.$apollo.query({
          query: gql`query ($tokenExists: Boolean!, $token: String!) {
            UserVerify(tokenExists: $tokenExists, token: $token) {
              _id email profileName photo
            }
          }`,
          variables: {
            tokenExists: token !== null,
            token,
          },
        });

        this.$store.dispatch('counter/getUser', user.data.UserVerify);
      }
      catch (error0) {
        console.error(error0.message);
      }
    },
    handleEverythingIsOke() {
      this.everythingIsOke = true;
    },
  },
  async mounted() {
    await this.getUserData();
    this.handleEverythingIsOke();
  },
}
</script>

<style>
@font-face {
  font-family: neue-roman;
  src: url('./assets/fonts/neue-roman/neue-roman.ttf');
}
*, *::before, *::after {
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
}
body {
  font-family: neue-roman;
  font-size: 1rem;
  background: #f5f5f5;
}
input, button, textarea {
  font-family: neue-roman;
  font-size: 1rem;
  border-radius: 0;
}
</style>
