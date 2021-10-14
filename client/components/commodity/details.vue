<template>
  <div :id="$style.details">
    <div :id="$style['details-wrap']">
      <div :id="$style['close-tab']">
        <button :class="$style.btn" @click="closeDetails">
          <span class="bx bx-undo" :class="$style.icon"></span>
          <p :class="$style.paragraf">Close Tab</p>
        </button>
      </div>
      <table :id="$style.table">
        <tr><td>Name</td><td :class="$style.item">{{ details.name }}</td></tr>
        <tr><td>Description</td><td :class="$style.item">{{ details.description }}</td></tr>
        <tr><td>Price</td><td :class="$style.item">{{ details.price }}</td></tr>
        <tr><td>Stock</td><td :class="$style.item">{{ details.stock }}</td></tr>
        <tr><td>Warehouse</td><td :class="$style.item">{{ details.warehouse }}</td></tr>
        <tr>
          <td>Category</td>
          <td :class="$style.item">
            <p :class="$style.categories"
              v-for="item of details.category"
              :key="item._id">{{ item }}
            </p>
          </td>
        </tr>
        <tr><td>Created</td><td :class="$style.item">{{ setDateTime(details.createdAt) }}</td></tr>
        <tr><td>Updated</td><td :class="$style.item">{{ setDateTime(details.updatedAt) }}</td></tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommodityDetails',
  props: {
    closeDetails: Function,
    details: Object,
  },
  methods: {
    setDateTime(item) {
      const date = new Date(item).toLocaleDateString('en-US', {
        weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
      });

      return date;
    },
  },
}
</script>

<style module>
#details {
  position: fixed;
  display: flex; justify-content: flex-end;
  width: 100%; height: 100%;
  background: #352a3a0e;
  z-index: 2;
}
#details-wrap {
  width: 500px;
  background: #fff;
  padding: 10px;
}
#close-tab {
  display: flex;
}
#close-tab .btn {
  display: flex; align-items: center;
  background: #f5e7ff;
  gap: 10px;
  padding: 5px 20px 5px 10px;
  border-radius: 2rem;
  cursor: pointer;
}
#close-tab .btn:hover {
  filter: brightness(0.95);
}
#close-tab .icon {
  border-radius: 50%;
  font-size: 1.5rem;
}
#details-wrap #table {
  margin: 10px 0 0 0;
  border-spacing: 10px;
  width: 100%;
}
tr td {
  padding: 0 0 5px 0;
  vertical-align: top;
}
tr .item {
  border-bottom: 1px solid #352a3a;
  display: flex; justify-content: flex-start; gap: 5px;
}
tr .item .categories {
  background: #f5e7ff;
  padding: 0 10px;
  border-radius: 2rem;
}
</style>
