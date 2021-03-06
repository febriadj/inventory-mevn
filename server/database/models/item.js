const { Schema, model } = require('mongoose');

const ItemModel = model('items', new Schema({
  userId: {
    type: String, required: true,
  },
  name: {
    type: String, required: true,
  },
  description: String,
  price: {
    type: Number, default: 0,
  },
  stock: {
    type: Number, default: 0,
  },
  category: [String],
  warehouse: {
    type: String, required: true,
  },
}, {
  timestamps: true,
}));

module.exports = ItemModel;
