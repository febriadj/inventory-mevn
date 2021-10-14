<template>
  <div :id="$style.commodity">
    <Incoming v-if="incomingFormIsOpen" :updateList="handleGetList" />
    <Details
      v-if="details.open"
      :closeDetails="handleOpenDetails"
      :details="details.data"
    />
    <div :id="$style['commodity-wrap']">
      <List
        :commodityList="commodityList"
        :updateList="handleGetList"
        :openDetails="handleOpenDetails"
      />
    </div>
    <div :id="$style['open-incoming-commo']">
      <button
        class="bx bx-plus"
        :class="$style.btn"
        @click="handleIncomingFormIsOpen"
      ></button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import List from '../components/commodity/list.vue';
import Incoming from '../components/commodity/incoming.vue';
import Details from '../components/commodity/details.vue';

export default {
  name: 'Commodity',
  components: {
    List, Incoming, Details,
  },
  data: () => ({
    commodityList: [],
    incomingFormIsOpen: false,
    details: {
      open: false, data: null,
    },
  }),
  methods: {
    handleIncomingFormIsOpen() {
      this.incomingFormIsOpen = !this.incomingFormIsOpen;

      if (this.details.open) {
        this.details.open = false;
      }
    },
    async handleGetList() {
      try {
        const req = await this.$apollo.query({
          query: gql`{
            GetAllCommodities(orderBy: "desc") {
              _id name description price stock warehouse category
              createdAt updatedAt
            }
          }`,
        });

        this.commodityList = req.data.GetAllCommodities;
        return this.commodityList;
      }
      catch (error0) {
        return console.error(error0.message);
      }
    },
    handleOpenDetails(item) {
      this.details.open = !this.details.open;
      this.details.data = item;
    },
  },
  async mounted() {
    await this.handleGetList();
  },
}
</script>

<style module>
#commodity {
  width: 100%;
}
#commodity-wrap {
  padding: 20px 20px 20px 240px;
}
#open-incoming-commo {
  position: fixed;
  bottom: 0;
  width: 100%; height: 60px;
  display: flex; justify-content: flex-end; align-items: center;
  transform: translateY(100px);
  z-index: 9;
}
#open-incoming-commo .btn {
  transform: translateY(-120px) translateX(-20px);
  width: 60px; height: 60px;
  display: flex; justify-content: center; align-items: center;
  font-size: 2rem;
  border-radius: 50%;
  background: #95899e;
  cursor: pointer;
}
</style>
