<template>
  <div :id="$style.list">
    <table :id="$style.table">
      <tr :class="$style['list-header']">
        <td :class="$style.name">Name</td>
        <td :class="$style.price">Price</td>
        <td :class="$style.stock">Stock</td>
        <td :class="$style.warehouse">Warehouse</td>
        <td :class="$style.action">Action</td>
      </tr>
      <tr :class="$style['list-value']" v-for="item of itemList" :key="item._id">
        <td :class="$style.name" @click="openDetails(item)">
          <p :class="$style.paragraf"
            :style="details._id === item._id ? 'text-decoration: underline' : null"
          >
          {{ item.name }}
          </p>
        </td>
        <td :class="$style.price">{{ convertToRupiah(item.price) }}</td>
        <td :class="$style.stock">{{ item.stock }}</td>
        <td :class="$style.warehouse">{{ item.warehouse }}</td>
        <td :class="$style.action">
          <button class="bx bx-pencil" :class="$style.btn"></button>
          <button
            class="bx bx-trash"
            :class="$style.btn"
            @click="handleDeleteItem(item._id)"
          >
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'List',
  props: {
    itemList: Array,
    updateList: Function,
    openDetails: Function,
    details: Object,
    convertToRupiah: Function,
  },
  methods: {
    async handleDeleteItem(itemId) {
      try {
        await this.$apollo.mutate({
          mutation: gql`mutation($_id: ID!, $userId: String!) {
            DeleteItem(_id: $_id, userId: $userId) {
              _id name
            }
          }`,
          variables: {
            _id: itemId,
            userId: this.$store.getters.getUser._id,
          },
        });

        this.$router.go();
      }
      catch (error0) {
        this.notif = error0.message;
      }
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
}
tr .name {
  overflow-x: hidden;
  max-width: 230px;
}
tr .name .paragraf {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
tr .stock {
  max-width: 30px;
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
  width: 25px; height: 25px;
  border-radius: 50%;
  background: #e3e3e9;
  font-size: 0.9rem;
  cursor: pointer;
}
.list-value .action .btn:hover {
  filter: brightness(0.95);
}
.action {
  vertical-align: middle;
  text-align: center;
  gap: 5px;
}
</style>
