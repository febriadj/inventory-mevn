<template>
  <div :id="$style.details">
    <div :id="$style['details-wrap']">
      <repay-per-stock
        v-if="repayPerStockIsOpen"
        :details="details"
        :closeRepayPerStock="handleOpenRepayPerStock"
        :convertToRupiah="convertToRupiah"
      >
      </repay-per-stock>
      <div :id="$style.body">
        <div :id="$style.top">
          <div :id="$style.header">
            <div :id="$style.top">
              <h2 :class="$style.title">Loan Details</h2>
              <button :class="$style.btn" @click="handleCloseDetails">
                <span class="bx bx-undo" :class="$style.icon"></span>
                <p :class="$style.paragraf">Close Tab</p>
              </button>
            </div>
          </div>
          <table :id="$style.table">
            <tr><td>Item ID</td><td :class="$style.item">{{ details.itemId }}</td></tr>
            <tr><td>Item Name</td><td :class="$style.item">{{ details.itemName }}</td></tr>
            <tr><td>Customer</td><td :class="$style.item">{{ details.customerName }}</td></tr>
            <tr><td>NIK</td><td :class="$style.item">{{ details.nik }}</td></tr>
            <tr><td>Warehouse</td><td :class="$style.item">{{ details.warehouse }}</td></tr>
            <tr><td>Quantity</td><td :class="$style.item">{{ details.quantity }}</td></tr>
            <tr>
              <td>Price</td>
              <td :class="$style.item">{{ convertToRupiah(details.price) }}</td>
            </tr>
          </table>
        </div>
        <div :id="$style['repay-loan']">
          <button
            :class="$style.btn"
          > Repay Loan
          </button>
          <button
            :class="$style.btn"
            @click="handleOpenRepayPerStock"
          > Repay Loan/Stock
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RepayPerStock from './repayPerStock.vue';

export default {
  name: 'LoanDetails',
  props: {
    details: Object,
    handleCloseDetails: Function,
    convertToRupiah: Function,
  },
  components: {
    RepayPerStock,
  },
  data() {
    return {
      repayPerStockIsOpen: false,
    }
  },
  methods: {
    handleOpenRepayPerStock() {
      this.repayPerStockIsOpen = !this.repayPerStockIsOpen;
    },
  },
}
</script>

<style module>
#details {
  position: fixed;
  width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: center;
  background: #171724bb;
  z-index: 9;
}
#details-wrap {
  width: 500px;
  position: relative;
}
#body {
  background: #fff;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 20px;
}
#header {
  margin: 0 0 20px 0;
}
#header #top {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 20px;
  margin: 0 0 10px 0;
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
#repay-loan {
  display: flex; gap: 20px;
  padding: 40px 0 0 0;
}
#repay-loan .btn {
  background: #e3e3e9;
  padding: 5px 10px;
  border-bottom: 1px solid #352a3a;
  cursor: pointer;
}
#repay-loan .btn:hover {
  filter: brightness(0.95);
}
</style>
