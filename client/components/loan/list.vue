<template>
  <div :id="$style.list">
    <table :id="$style.table">
      <tr :class="$style['list-header']">
        <td :class="$style.name">Item Name</td>
        <td :class="$style.customer">Customer</td>
        <td :class="$style.name">NIK</td>
        <td :class="$style.quantity">Quantity</td>
        <td :class="$style.price">Price</td>
      </tr>
      <tr :class="$style['list-value']" v-for="loan of loanList" :key="loan._id">
        <td :class="$style.name" @click="handleOpenDetails(loan)">
          <p :class="$style.paragraf">
          {{ loan.itemName }}
          </p>
        </td>
        <td :class="$style.customer"><p :class="$style.paragraf">{{ loan.customerName }}</p></td>
        <td :class="$style.nik">{{ loan.nik }}</td>
        <td :class="$style.quantity">{{ loan.quantity }}</td>
        <td :class="$style.price">{{ convertToRupiah(loan.price) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'LoanList',
  props: {
    loanList: Array,
    handleOpenDetails: Function,
    convertToRupiah: Function,
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
tr .name {
  overflow-x: hidden;
  max-width: 300px;
}
tr .name .paragraf {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
tr .customer .paragraf {
  overflow-x: hidden;
  max-width: 250px;
}
tr .customer .paragraf {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
