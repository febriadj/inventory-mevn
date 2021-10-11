const { Schema, model } = require('mongoose');

const WarehouseModel = model('warehouses', new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  quantity: { type: Schema.Types.Number, default: 0 },
}, {
  timestamps: true,
}));

module.exports = WarehouseModel;
