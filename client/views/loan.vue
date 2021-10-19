<template>
  <div :id="$style.loan">
    <div :id="$style['loan-wrap']">
      <div :id="$style.header">
        <div :id="$style['header-wrap']">
          <chart-box :loanList="loanList"></chart-box>
          <repay></repay>
        </div>
      </div>
      <list :loanList="loanList"></list>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';
import chartbox from '../helpers/components/loan/chartbox';

import List from '../components/loan/list.vue';
import ChartBox from '../components/loan/chartbox.vue';
import Repay from '../components/loan/repay.vue';

export default {
  name: 'Loan',
  components: { List, ChartBox, Repay },
  data() {
    return {
      loanList: [],
      chartMostQuantity() {
        chartbox.mostQuantity(this.loanList);
      },
      chartMostPrice() {
        chartbox.mostPrice(this.loanList);
      },
      chartMostCommo() {
        chartbox.mostCommo(this.loanList);
      },
    }
  },
  methods: {
    async handleGetList() {
      const request = await this.$apollo.query({
        query: gql`query ($userId: String!, $orderBy: String!) {
          GetAllLoans(userId: $userId, orderBy: $orderBy) {
            _id
            itemId
            itemName
            customerName
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
  },
  async mounted() {
    await this.handleGetList();

    this.chartMostQuantity();
    this.chartMostPrice();
    this.chartMostCommo();
  },
}
</script>

<style module>
#loan-wrap {
  padding: 20px 20px 20px 240px;
}
#header {
  width: 100%;
  margin: 0 0 20px 0;
}
#header-wrap {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
