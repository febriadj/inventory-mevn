const { Schema, model } = require('mongoose');

const WarehouseModel = model('warehouses', new Schema({
  name: {
    type: String, unique: true, required: true,
  },
  code: {
    type: String,
    default() {
      const numeric = Math.floor(1000 - Math.random() * 9000);
      return `WH-${numeric}`;
    },
  },
  description: String,
  location: {
    type: String, required: true,
  },
}, {
  timestamps: true,
}));

module.exports = WarehouseModel;
