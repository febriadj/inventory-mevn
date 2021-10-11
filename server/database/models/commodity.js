const { Schema, model } = require('mongoose');

const CommodityModel = model('commodities', new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  warehouse: { type: String, required: true },
  category: [String],
}, {
  timestamps: true,
}));

module.exports = CommodityModel;
