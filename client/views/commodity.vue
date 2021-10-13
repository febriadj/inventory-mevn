<template>
  <div :id="$style.commodity">
    <Incoming v-if="incomingFormIsOpen" :updateList="this.handleGetList" />
    <div :id="$style['commodity-wrap']">
      <List :commodityList="commodityList" />
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

export default {
  name: 'Commodity',
  components: {
    List, Incoming,
  },
  data: () => ({
    commodityList: [],
    incomingFormIsOpen: false,
  }),
  methods: {
    handleIncomingFormIsOpen() {
      this.incomingFormIsOpen = !this.incomingFormIsOpen;
      return this.incomingFormIsOpen;
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
