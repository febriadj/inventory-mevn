<template>
  <div :id="$style.commodity">
    <Incoming v-if="incomingFormIsOpen" :handleIncomingForm="handleIncomingForm" />
    <ApplyLoan
      v-if="applyLoanTabIsOpen"
      :handleApplyLoanTab="handleApplyLoanTab"
      :commodityData="details"
      :convertToRupiah="convertToRupiah"
    />
    <Details
      :details="details"
      :handleApplyLoanTab="handleApplyLoanTab"
      :convertToRupiah="convertToRupiah"
    />
    <div :id="$style['commodity-wrap']">
      <div :id="$style.header">
        <button
          :class="$style['create-commo-btn']"
          @click="handleIncomingForm"
        >
          <i class="bx bx-plus"></i>
          <p :class="$style.paragraf">Create New Commodity</p>
        </button>
      </div>
      <List
        :commodityList="commodityList"
        :openDetails="handleOpenDetails"
        :details="details"
        :convertToRupiah="convertToRupiah"
      />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

import List from '../components/commodity/list.vue';
import Incoming from '../components/commodity/incoming.vue';
import Details from '../components/commodity/details.vue';
import ApplyLoan from '../components/commodity/applyLoan.vue';

export default {
  name: 'Commodity',
  components: {
    List, Incoming, Details, ApplyLoan,
  },
  data: () => ({
    commodityList: [],
    incomingFormIsOpen: false,
    applyLoanTabIsOpen: false,
    details: null,
  }),
  methods: {
    handleIncomingForm() {
      this.incomingFormIsOpen = !this.incomingFormIsOpen;
    },
    convertToRupiah(numeric) {
      let rupiah = '';
      const numToStr = numeric.toString().split('').reverse().join('');

      for (let i = 0; i < numToStr.length; i += 1) {
        if (i % 3 === 0) {
          rupiah += `${numToStr.substr(i, 3)}.`;
        }
      }

      return `Rp${rupiah.split('', rupiah.length - 1).reverse().join('')}`;
    },
    async handleGetList() {
      try {
        const request = await this.$apollo.query({
          query: gql`{
            GetAllCommodities(orderBy: "desc") {
              _id name description price stock warehouse category
              createdAt updatedAt
            }
          }`,
        });

        this.commodityList = request.data.GetAllCommodities;
      }
      catch (error0) {
        console.error(error0.message);
      }
    },
    handleOpenDetails(item) {
      this.details = item;
    },
    handleApplyLoanTab() {
      this.applyLoanTabIsOpen = !this.applyLoanTabIsOpen;
    },
  },
  async mounted() {
    await this.handleGetList();

    this.details = !this.details ? this.commodityList[0] : this.details;

    if (this.commodityList.length === 0) {
      this.details = {
        name: 'Undefined',
        description: 'Undefined',
        price: '',
        stock: 'Undefined',
        warehouse: 'Undefined',
        category: ['Undefined'],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    }
  },
}
</script>

<style module>
#commodity {
  width: 100%;
}
#commodity-wrap {
  padding: 20px 0;
  margin: 0 460px 0 240px;
}
#commodity-wrap #header {
  display: flex;
  margin: 0 0 20px 0;
}
#commodity-wrap #header .create-commo-btn {
  display: flex; align-items: center; gap: 10px;
  background: #fff;
  cursor: pointer;
  padding: 4px 20px;
  border-radius: 2rem;
}
</style>
