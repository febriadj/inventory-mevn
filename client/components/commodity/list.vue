<template>
  <div :id="$style.list">
    <table :id="$style.table">
      <tr :class="$style['list-header']">
        <td :class="$style.name">Name</td>
        <td :class="$style.price">Price</td>
        <td :class="$style.stock">Stock</td>
        <td :class="$style.warehouse">Warehouse</td>
        <td :class="$style.action">Action</td>
      </tr>
      <tr :class="$style['list-value']" v-for="item of commodityList" :key="item._id">
        <td :class="$style.name">{{ item.name }}</td>
        <td :class="$style.price">{{ item.price }}</td>
        <td :class="$style.stock">{{ item.stock }}</td>
        <td :class="$style.warehouse">{{ item.warehouse }}</td>
        <td :class="$style.action">
          <button class="bx bx-pencil" :class="$style.btn"></button>
          <button class="bx bx-trash" :class="$style.btn"></button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: { commodityList: Array },
}
</script>

<style module>
#list {
  display: flex;
}
#table {
  width: 100%;
}
#table tr td {
  padding: 8px 10px;
}
.list-header {
  text-transform: uppercase;
  font-size: 0.9rem;
}
.list-header td {
  border-bottom: 1px solid #352a3a;
}
.list-value td {
  background: #fff;
  font-size: 0.95rem;
}
.list-value .action .btn {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: #f5e7ff;
  font-size: 0.9rem;
  cursor: pointer;
}
.list-value .action .btn:hover {
  filter: brightness(0.95);
}
.action {
  display: flex; justify-content: center; align-items: center;
  gap: 5px;
}
</style>
