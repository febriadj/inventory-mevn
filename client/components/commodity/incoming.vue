<template>
  <div :id="$style.incoming">
    <div :id="$style['incoming-wrap']">
      <div :id="$style.header">
        <div :id="$style.top">
          <h2 :class="$style.title">Create New Commodity</h2>
          <button :class="$style.btn" @click="handleIncomingForm">
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
        <button type="submit" :class="$style['submit-btn']">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

export default {
  name: 'IncomingForm',
  props: {
    handleIncomingForm: Function,
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
      try {
        await this.$apollo.mutate({
          mutation: gql`mutation (
              $name: String!
              $description: String
              $price: Int!
              $stock: Int!
              $warehouse: String!
              $category: [String]
            ) {
            AddCommodity(
              name: $name
              description: $description
              price: $price
              stock: $stock
              warehouse: $warehouse
              category: $category
            ) {
              _id name description price stock warehouse category createdAt updatedAt
            }
          }`,
          variables: {
            name: this.fields.name,
            description: this.fields.description,
            price: Number(this.fields.price),
            stock: Number(this.fields.stock),
            warehouse: this.fields.warehouse,
            category: this.fields.categories,
          },
        });

        this.notif = 'Successfully added commodity';

        this.fields.name = '';
        this.fields.description = '';
        this.fields.price = '';
        this.fields.stock = '';
        this.fields.warehouse = '';
        this.fields.category = '';

        setTimeout(() => this.$router.go(), 2000);
      }
      catch (error0) {
        this.notif = error0.message;
      }
    },
  },
}
</script>

<style module>
#incoming {
  position: fixed;
  width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: center;
  background: #352a3a46;
  z-index: 9;
}
#incoming-wrap {
  background: #fff;
  padding: 20px;
  width: 500px;
}
#header #top {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 20px;
  margin: 0 0 10px 0;
}
#header #top .btn {
  display: flex; align-items: center;
  background: #e3e3e9;
  gap: 10px;
  padding: 5px 20px 5px 10px;
  border-radius: 2rem;
  cursor: pointer;
}
#header #top .btn:hover {
  filter: brightness(0.95);
}
#header #top .btn .icon {
  border-radius: 50%;
  font-size: 1.5rem;
}
#header #notif {
  display: flex;
}
#header #notif .message {
  font-size: 0.95rem;
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
  height: 50px;
  border-bottom: 1px solid #352a3a;
  border-radius: 0;
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
  cursor: pointer;
}
.submit-btn {
  grid-area: submit;
  padding: 10px 0;
  background: #e3e3e9;
  cursor: pointer;
  border-radius: 2rem;
  margin: 20px 0 0 0;
}
.submit-btn:hover {
  filter: brightness(0.95);
}
</style>
