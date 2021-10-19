<template>
  <div :id="$style.list">
    <table :id="$style.table">
      <tr :class="$style['list-header']">
        <td :class="$style.name">Item Name</td>
        <td :class="$style.customer">Customer</td>
        <td :class="$style.price">Price</td>
        <td :class="$style.quantity">Quantity</td>
      </tr>
      <tr :class="$style['list-value']" v-for="loan of loanList" :key="loan._id">
        <td :class="$style.name"><p :class="$style.paragraf">{{ loan.itemName }}</p></td>
        <td :class="$style.customer">{{ loan.customerName }}</td>
        <td :class="$style.price">{{ convertToRupiah(loan.price) }}</td>
        <td :class="$style.quantity">{{ loan.quantity }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    loanList: Array,
  },
  methods: {
    convertToRupiah(numeric) {
      let rupiah = '';
      const numToStr = numeric.toString().split('').reverse().join('');

      for (let i = 0; i < numToStr.length; i += 1) {
        if (i % 3 === 0) {
          rupiah += `${numToStr.substr(i, 3)},`;
        }
      }

      return `Rp${rupiah.split('', rupiah.length - 1).reverse().join('')}`;
    },
  },
}
</script>

<style module>
#list {
  display: flex;
}
#table {
  width: 100%;
  border-collapse: collapse;
}
#table tr td {
  padding: 8px 10px;
  vertical-align: middle;
}
.list-header {
  text-transform: uppercase;
  font-size: 0.9rem;
}
.list-header td {
  border-bottom: 1px solid #352a3a;
  background: #fff;
}
.list-value td {
  background: #fff;
  font-size: 0.95rem;
}
.list-value .name {
  cursor: pointer;
}
.list-value .name:hover .paragraf {
  text-decoration: underline;
}
.list-value .action .btn {
  width: 20px; height: 20px;
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
