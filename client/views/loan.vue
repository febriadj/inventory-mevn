<template>
  <div :id="$style.loan">
    <Details
      v-if="details.open"
      :handleCloseDetails="handleOpenDetails"
      :details="details.data"
      :convertToRupiah="convertToRupiah"
    />
    <div :id="$style['loan-wrap']">
      <div :id="$style.box">
        <chart-box :loanList="loanList"></chart-box>
        <single-box></single-box>
      </div>
      <list
        :loanList="loanList"
        :handleOpenDetails="handleOpenDetails"
        :convertToRupiah="convertToRupiah"
      >
      </list>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';
import chartbox from '../helpers/components/loan/chartbox';

import List from '../components/loan/list.vue';
import ChartBox from '../components/loan/chartbox.vue';
import SingleBox from '../components/loan/singleBox.vue';
import Details from '../components/loan/details.vue';

export default {
  name: 'Loan',
  components: {
    List, ChartBox, SingleBox, Details,
  },
  data() {
    return {
      loanList: [],
      details: {
        open: false,
        data: null,
      },
      chartMostQuantity() {
        chartbox.mostQuantity(this.loanList);
      },
      chartMostPrice() {
        chartbox.mostPrice(this.loanList);
      },
    }
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
    async handleGetList() {
      const request = await this.$apollo.query({
        query: gql`query($userId: String!, $orderBy: String!) {
          GetAllLoans(userId: $userId, orderBy: $orderBy) {
            _id
            itemId
            itemName
            customerName
            nik
            warehouse
            quantity
            price
          }
        }`,
        variables: {
          userId: this.$store.getters.getUser._id,
          orderBy: 'desc',
        },
      });

      this.loanList = request.data.GetAllLoans;
      return this.loanList;
    },
    handleOpenDetails(item) {
      this.details.open = !this.details.open;
      this.details.data = this.details.open ? item : null;
    },
  },
  async mounted() {
    await this.handleGetList();

    this.chartMostQuantity();
    this.chartMostPrice();
  },
}
</script>

<style module>
#loan-wrap {
  padding: 20px 20px 20px 240px;
}
#box {
  margin: 0 0 20px 0;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
