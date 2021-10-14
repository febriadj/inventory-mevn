const { Schema, model } = require('mongoose');

const LoanModel = model('loans', new Schema({
  commodityId: { type: String, required: true },
  commodityName: { type: String },
  customerName: { type: String },
  nik: { type: String, required: true },
  quantity: { type: Schema.Types.Number, default: 0 },
  warehouse: { type: String },
  price: { type: Schema.Types.Number, default: 0 },
}, {
  timestamps: true,
}));

module.exports = LoanModel;
