<template>
  <div :id="$style.notfound">
    <div :id="$style['notfound-wrap']">
      <h1 :class="$style.title">Oops. 404</h1>
      <p :class="$style.paragraf">The page you are looking for was not found</p>
      <div :class="$style.toggle">
        <router-link to="/" :class="$style.btn">
          <i class="bx bx-undo"></i>
          <p>To Dashboard</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style module>
#notfound {
  position: absolute;
  width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: center;
  background: #fcf7ff;
  z-index: 9;
}
.title {
  text-transform: uppercase;
}
.toggle {
  display: flex;
  margin: 20px 0 0 0;
}
.toggle .btn {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none;
  background: #95899e;
  padding: 5px 15px 5px 10px;
  color: #fff;
  border-radius: 2rem;
}
</style>
