<template>
  <p class="paragraf">hello world</p>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    document.title = 'Inventory App'
  },
}
</script>

<style scoped>
.paragraf {
  text-decoration: underline;
}
</style>
