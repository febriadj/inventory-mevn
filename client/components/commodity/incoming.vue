<template>
  <div :id="$style.incoming">
    <div :id="$style['incoming-wrap']">
      <div :id="$style.header">
        <h2 :class="$style.title">Create New Commodity</h2>
        <span :id="$style.notif">
          <p :class="$style.message" v-if="notif">{{ notif }}</p>
        </span>
      </div>
      <form method="post" :id="$style.form" @submit.prevent="handleSubmit">
        <input
          type="text"
          name="name"
          :class="$style['input-name']"
          placeholder="Item Name*"
          v-model="fields.name"
          required
        />
        <textarea
          type="text"
          name="description"
          :class="$style['input-description']"
          placeholder="Short description to describe your item"
          v-model="fields.description"
        ></textarea>
        <input
          type="number"
          name="price"
          :class="$style['input-price']"
          placeholder="Item Price*"
          v-model="fields.price"
          required
        />
        <input
          type="number"
          name="stock"
          :class="$style['input-stock']"
          placeholder="Item Stock*"
          v-model="fields.stock"
          required
        />
        <input
          type="text"
          name="warehouse"
          :class="$style['input-warehouse']"
          placeholder="Warehouse name*"
          v-model="fields.warehouse"
          required
        />
        <input
          type="text"
          name="category"
          :class="$style['input-category']"
          placeholder="Categories"
          v-model="fields.categoryOnChange"
          @keyup="handleChangeCategory"
        />
        <div :id="$style.categories">
          <span :class="$style.item"
            v-for="(item, index) of fields.categories" :key="index"
            @click="deleteCategory(item)"
          >
            {{ item }}
          </span>
        </div>
        <button type="submit" :class="$style['submit-btn']">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'IncomingForm',
  props: {
    updateList: { type: Function },
  },
  data() {
    return {
      fields: {
        name: '',
        description: '',
        price: '',
        stock: '',
        warehouse: '',
        categoryOnChange: '',
        categories: [],
      },
      notif: null,
    }
  },
  methods: {
    handleChangeCategory(event) {
      const { categoryOnChange, categories } = this.fields;

      if (event.keyCode === 32 && categoryOnChange) {
        if (!categories.includes(categoryOnChange.trim())) {
          categories.push(categoryOnChange.trim());
        }
        this.fields.categoryOnChange = '';
      }
    },
    deleteCategory(selected) {
      this.fields.categories = this.fields.categories.filter((item) => item !== selected);
    },
    async handleSubmit() {
      const {
        name, description, price, stock, warehouse, categories,
      } = this.fields;

      this.$apollo.mutate({
        mutation: gql`mutation {
          AddCommodity(
            name: "${name}" description: "${description}" price: ${price} stock: ${stock}
            warehouse: "${warehouse}" category: ${categories}
          ) {
            _id name description price stock warehouse category
            createdAt updatedAt
          }
        }`,
        error(error0) {
          this.notif = error0.message;
        },
      });

      await this.updateList();
      this.notif = 'Successfully added commodity';

      this.fields.name = '';
      this.fields.description = '';
      this.fields.price = '';
      this.fields.stock = '';
      this.fields.warehouse = '';
      this.fields.category = '';
    },
  },
}
</script>

<style module>
#incoming {
  position: fixed;
  width: 100%; height: 100%;
  display: flex; justify-content: flex-end;
  background: #352a3a0e;
  z-index: 9;
}
#incoming-wrap {
  background: #fff;
  padding: 20px;
  width: 500px;
}
#header {
  margin: 0 0 10px 0;
}
#notif {
  display: flex;
}
#notif .message {
  margin: 20px 0 0 0;
  background: #f5e7ff;
  font-size: 0.95rem;
  padding: 4px 20px 4px 10px;
  border-radius: 0 2rem 2rem 0;
}
#form {
  display: grid; grid-auto-columns: 1fr; gap: 10px;
  grid-template-areas:
  "name name"
  "price stock"
  "warehouse category"
  ". categories"
  "description description"
  "submit .";
}
#form input {
  border-bottom: 1px solid #352a3a;
  border-radius: 0;
  padding: 10px 0;
}
.input-name { grid-area: name; }
.input-description {
  grid-area: description;
  resize: none;
  height: 100px;
  border-bottom: 1px solid #352a3a;
  border-radius: 0;
  margin: 20px 0 0 0;
}
.input-price { grid-area: price; }
.input-stock { grid-area: stock; }
.input-warehouse { grid-area: warehouse; }
.input-category { grid-area: category; }
#categories {
  grid-area: categories;
  display: flex; align-items: center; gap: 5px;
  flex-wrap: wrap;
}
#categories .item {
  text-decoration: underline;
  font-size: 0.9rem;
}
.submit-btn {
  grid-area: submit;
  padding: 10px 0;
  background: #f5e7ff;
  cursor: pointer;
}
.submit-btn:hover {
  filter: brightness(0.95);
}
</style>
