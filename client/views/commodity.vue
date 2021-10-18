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
      <div :id="$style['chart-box']">
        <div :id="$style.header">
          <h3 :class="$style.title">Chart of 4 newly updated Commodity data</h3>
        </div>
        <div :id="$style['chart-box-wrap']">
          <canvas id="chart-stock" :class="$style['commodity-chart']"></canvas>
          <canvas id="chart-price" :class="$style['commodity-chart']"></canvas>
        </div>
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
import { gql } from 'apollo-boost';
import Chart from 'chart.js/auto';

import List from '../components/commodity/list.vue';
import Incoming from '../components/commodity/incoming.vue';
import Details from '../components/commodity/details.vue';
import ApplyLoan from '../components/commodity/applyLoan.vue';

export default {
  name: 'Commodity',
  components: {
    List, Incoming, Details, ApplyLoan,
  },
  data() {
    return {
      commodityList: [],
      incomingFormIsOpen: false,
      applyLoanTabIsOpen: false,
      details: null,
      chartStockComponent() {
        const chartData = [...this.commodityList].slice(0, 4);

        const chart = new Chart(document.getElementById('chart-stock'), {
          type: 'bar',
          data: {
            labels: chartData.map((item) => item.name),
            datasets: [
              {
                label: 'Stock Quantity',
                backgroundColor: [
                  '#515164bb', '#8888a5bb',
                ],
                maxBarThickness: 80,
                data: chartData.map((item) => item.stock),
              },
            ],
          },
          options: {
            responsive: false,
            scales: {
              x: {
                ticks: {
                  display: false,
                },
              },
            },
          },
        });

        return chart;
      },
      chartPriceComponent() {
        const chartData = [...this.commodityList].slice(0, 4);

        const chart = new Chart(document.getElementById('chart-price'), {
          type: 'bar',
          data: {
            labels: chartData.map((item) => item.name),
            datasets: [
              {
                label: 'Unit Price',
                backgroundColor: [
                  '#515164bb', '#8888a5bb',
                ],
                maxBarThickness: 80,
                data: chartData.map((item) => item.price),
              },
            ],
          },
          options: {
            responsive: false,
            scales: {
              x: {
                ticks: {
                  display: false,
                },
              },
            },
          },
        });

        return chart;
      },
    }
  },
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
    this.chartStockComponent();
    this.chartPriceComponent();

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
  margin: 0 430px 0 240px;
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
#chart-box {
  background: #fff;
  margin: 0 0 20px 0;
}
#chart-box #header {
  padding: 20px 20px 0 20px;
}
#chart-box-wrap {
  display: grid; grid-template-columns: 1fr 1fr;
  padding: 0 20px 20px 20px;
}
</style>
