<template>
  <div :id="$style['repay-per-stock']">
    <div :id="$style['repay-per-stock-wrap']">
      <div :id="$style.header">
        <div :id="$style.top">
          <h2 :class="$style.title">Loan Details</h2>
          <button :class="$style.btn" @click="closeRepayPerStock">
            <span class="bx bx-undo" :class="$style.icon"></span>
            <p :class="$style.paragraf">Close Tab</p>
          </button>
        </div>
        <span :id="$style.notif">
          <p :class="$style.message" v-if="notif">{{ notif }}</p>
        </span>
      </div>
      <table :id="$style.table">
        <tr><td>Quantity</td><td>: {{ details.quantity }}</td></tr>
        <tr><td>Price</td><td>: {{ convertToRupiah(details.price) }}</td></tr>
      </table>
      <form method="post" :id="$style.form" @submit.prevent="handleSubmit">
        <div :class="$style.head">
          <label for="quantity">Number of Quantity</label>
        </div>
        <input type="number" name="quantity" v-model="quantity">
        <span :id="$style.submit">
          <button type="submit" :class="$style['submit-btn']">Submit</button>
        </span>
      </form>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'LoanRepayPerStock',
  props: {
    details: Object,
    closeRepayPerStock: Function,
    convertToRupiah: Function,
  },
  data() {
    return {
      quantity: 0,
      notif: null,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$apollo.mutate({
          mutation: gql`mutation($_id: ID!, $userId: String!, $quantity: Int!) {
            RepayLoanPerStock(_id: $_id, userId: $userId, quantity: $quantity) {
              _id userId quantity
            }
          }`,
          variables: {
            _id: this.details._id,
            userId: this.$store.getters.getUser._id,
            quantity: Number(this.quantity),
          },
        });

        setTimeout(() => this.$router.go(), 800);
      }
      catch (error0) {
        this.notif = error0.message;
      }
    },
  },
}
</script>

<style module>
#repay-per-stock {
  position: absolute;
  width: 100%; height: 100%;
  background: #171724;
  z-index: 9;
  color: #ffffffda;
}
#repay-per-stock-wrap {
  padding: 20px;
}
#repay-per-stock #header {
  margin: 0 0 20px 0;
}
#repay-per-stock #header #top {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 20px;
  margin: 0 0 10px 0;
}
#repay-per-stock #header .btn {
  display: flex; align-items: center;
  background: #e3e3e9;
  gap: 10px;
  padding: 5px 20px 5px 10px;
  border-radius: 2rem;
  cursor: pointer;
}
#repay-per-stock #header .btn:hover {
  filter: brightness(0.95);
}
#repay-per-stock #header .icon {
  border-radius: 50%;
  font-size: 1.5rem;
}
#repay-per-stock #table {
  border-collapse: collapse;
}
#repay-per-stock tr td {
  padding: 5px 0;
}
#repay-per-stock #form {
  display: flex; flex-direction: column;
  margin: 20px 0 0 0;
}
#repay-per-stock input::-webkit-outer-spin-button,
#repay-per-stock input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#repay-per-stock .head {
  transform: translate(30px, 10px);
}
#repay-per-stock .head label {
  background: #171724;
  padding: 0 10px;
}
#repay-per-stock input {
  background: transparent;
  border: 1px solid #ffffffda;
  color: #ffffffda;
  padding: 20px;
}
#repay-per-stock #submit {
  display: flex;
}
#repay-per-stock .submit-btn {
  padding: 10px 20px;
  background: #e3e3e9;
  cursor: pointer;
  margin: 20px 0 0 0;
  border-radius: 2rem;
}
#repay-per-stock .submit-btn:hover {
  filter: brightness(0.95);
}
</style>
