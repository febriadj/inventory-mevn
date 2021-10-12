<template>
  <fragment>
    <Navbar />
    <router-view />
  </fragment>
</template>

<script>
import Navbar from './components/utils/navbar.vue';

export default {
  name: 'App',
  components: { Navbar },
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
}
input, button {
  font-family: neue-roman;
  font-size: 1rem;
}
</style>
