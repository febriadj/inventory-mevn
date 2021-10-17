<template>
  <div :id="$style.loan">
    <div :id="$style['loan-wrap']">
      <List :loanList="loanList" />
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost'

import List from '../components/loan/list.vue';

export default {
  name: 'Loan',
  components: { List },
  data: () => ({
    loanList: [],
  }),
  methods: {
    async handleGetList() {
      const request = await this.$apollo.query({
        query: gql`query {
          GetAllLoan(orderBy: "desc") {
            _id commodityId commodityName customerName
            quantity warehouse price
          }
        }`,
      });

      this.loanList = request.data.GetAllLoan;
      return this.loanList;
    },
  },
  async mounted() {
    await this.handleGetList();
  },
}
</script>

<style module>
#loan-wrap {
  padding: 20px 20px 20px 240px;
}
</style>
