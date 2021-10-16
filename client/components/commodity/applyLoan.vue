<template>
  <div :id="$style['apply-loan']">
    <div :id="$style['apply-loan-wrap']">
      <div :id="$style.header">
        <div :id="$style.top">
          <h2 :class="$style.title">Apply for a Loan</h2>
          <button :class="$style.btn" @click="handleApplyLoanTab">
            <span class="bx bx-undo" :class="$style.icon"></span>
            <p :class="$style.paragraf">Close Tab</p>
          </button>
        </div>
        <span :id="$style.notif">
          <p :class="$style.message" v-if="notif">{{ notif }}</p>
        </span>
      </div>
      <form method="post" :id="$style.form" @submit.prevent="handleSubmit" autocomplete="off">
        <input
          type="text"
          name="commodityName"
          :class="$style['input-name']"
          :value="commodityData.name"
          readonly
        />
        <input
          type="text"
          name="customerName"
          :class="$style['input-customer']"
          placeholder="Customer Name"
          v-model="fields.customerName"
          required
        />
        <input
          type="text"
          name="nik"
          :class="$style['input-nik']"
          placeholder="NIK"
          v-model="fields.nik"
          required
        />
        <input
          type="text"
          name="warehouse"
          :class="$style['input-warehouse']"
          :value="commodityData.warehouse"
          readonly
        />
        <input
          type="number"
          name="quantity"
          :class="$style['input-quantity']"
          placeholder="Quantity ec. 2"
          @keyup="handleQuantityField"
        />
        <input
          type="text"
          name="price"
          :class="$style['input-price']"
          :value="convertToRupiah(fields.price)"
          readonly
        />
        <button type="submit" :class="$style['submit-btn']">Apply Loan</button>
      </form>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'ApplyLoan',
  props: {
    handleApplyLoanTab: Function,
    commodityData: Object,
    convertToRupiah: Function,
  },
  data() {
    return {
      fields: {
        customerName: '',
        nik: '',
        quantity: '',
        price: this.commodityData.price,
      },
      notif: null,
    }
  },
  methods: {
    handleQuantityField(event) {
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        this.fields.quantity += event.key;
        this.fields.price *= this.fields.quantity
      }
      if (this.fields.quantity.length > 0 && event.keyCode === 8) {
        this.fields.quantity = this.fields.quantity.substr(0, this.fields.quantity.length - 1);
        this.fields.price /= this.fields.quantity;
      }

      if (this.fields.quantity.length === 0) {
        this.fields.price = this.commodityData.price;
      }
    },
    async handleSubmit() {
      try {
        await this.$apollo.mutate({
          mutation: gql`mutation {
            AddLoan(
              commodityId: "${this.commodityData._id}"
              commodityName: "${this.commodityData.name}"
              customerName: "${this.fields.customerName}"
              nik: "${this.fields.nik}"
              quantity: ${Number(this.fields.quantity)}
              warehouse: "${this.commodityData.warehouse}"
              price: ${this.fields.price}
            ) {
              commodityId
              commodityName
              customerName
              nik
              quantity
              price
            }
          }`,
        });

        this.notif = 'Successfully apply for a loan';

        this.fields.customerName = '';
        this.fields.nik = '';
        this.fields.quantity = '';
        this.fields.price = this.commodityData.price;

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      catch (error0) {
        this.notif = error0.message;
      }
    },
  },
}
</script>

<style module>
#apply-loan {
  position: fixed;
  right: 0;
  height: 100%;
  z-index: 1;
  display: flex;
}
#apply-loan-wrap {
  width: 380px;
  background: #fff;
  padding: 20px;
  margin: 20px;
}
#header {
  margin: 0 0 20px 0;
}
#header #top {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 20px;
  margin: 0 0 10px 0;
}
#header .btn {
  display: flex; align-items: center;
  background: #f5e7ff;
  gap: 10px;
  padding: 5px 20px 5px 10px;
  border-radius: 2rem;
  cursor: pointer;
}
#header .btn:hover {
  filter: brightness(0.95);
}
#header .icon {
  border-radius: 50%;
  font-size: 1.5rem;
}
#notif {
  display: flex;
}
#notif .message {
  font-size: 0.95rem;
}
#form {
  display: grid; gap: 10px;
  grid-template-areas:
  "name name"
  "customer nik"
  "warehouse warehouse"
  "quantity price"
  "submit .";
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#form input {
  border-bottom: 1px solid #352a3a;
  border-radius: 0;
  padding: 10px 0;
  width: 100%;
}
.input-name { grid-area: name; font-style: italic; }
.input-customer { grid-area: customer; }
.input-nik { grid-area: nik; }
.input-warehouse { grid-area: warehouse; font-style: italic; }
.input-quantity { grid-area: quantity; }
.input-price { grid-area: price; font-style: italic; }
.submit-btn {
  grid-area: submit;
  padding: 10px 0;
  background: #f5e7ff;
  border-bottom: 1px solid #352a3a;
  cursor: pointer;
  margin: 20px 0 0 0;
}
.submit-btn:hover {
  filter: brightness(0.95);
}
</style>
