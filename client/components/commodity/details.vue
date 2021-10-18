<template>
  <div :id="$style.details">
    <div :id="$style['details-wrap']">
      <div :id="$style.top">
        <div :id="$style.header">
          <h2 :class="$style.title">Commodity Details</h2>
        </div>
        <table :id="$style.table">
          <tr><td>Name</td><td :class="$style.item">{{ details.name }}</td></tr>
          <tr><td>Description</td><td :class="$style.item">{{ details.description }}</td></tr>
          <tr><td>Price</td><td :class="$style.item">{{ convertToRupiah(details.price) }}</td></tr>
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
          <tr>
            <td>Created</td>
            <td :class="$style.item">{{ setDateTime(details.createdAt) }}</td>
          </tr>
          <tr>
            <td>Updated</td>
            <td :class="$style.item">{{ setDateTime(details.updatedAt) }}</td>
          </tr>
        </table>
      </div>
      <div :id="$style['apply-loan']">
        <button
          :class="$style.btn"
          @click="handleApplyLoanTab()"
        > Apply for a Loan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommodityDetails',
  props: {
    details: Object,
    handleApplyLoanTab: Function,
    convertToRupiah: Function,
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
  height: 100%;
  right: 0;
}
#details-wrap {
  width: 350px;
  background: #fff;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 20px;
  margin: 20px;
}
#header {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 20px;
  margin: 0 0 20px 0;
}
#header .btn {
  display: flex; align-items: center;
  background: #e3e3e9;
  gap: 10px;
  padding: 5px 20px 5px 10px;
  border-radius: 2rem;
  cursor: pointer;
}
#header .btn:hover {
  filter: brightness(0.95);
}
#header .icon {
  border-radius: 50%;
  font-size: 1.5rem;
}
#details-wrap #table {
  margin: 10px 0 0 0;
  width: 100%;
  border-collapse: collapse;
}
tr td:nth-child(1) {
  width: 90px;
}
tr td {
  padding: 10px 0;
  vertical-align: top;
}
tr .item {
  border-bottom: 1px solid #352a3a;
  display: flex; justify-content: flex-start; gap: 5px;
}
tr .item .categories {
  background: #e3e3e9;
  padding: 0 10px;
  border-radius: 2rem;
}
#apply-loan {
  display: flex;
  padding: 20px 0 0 0;
}
#apply-loan .btn {
  background: #e3e3e9;
  padding: 5px 10px;
  border-bottom: 1px solid #352a3a;
  cursor: pointer;
}
#apply-loan .btn:hover {
  filter: brightness(0.95);
}
</style>
