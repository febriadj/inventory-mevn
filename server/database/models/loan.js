const { Schema, model } = require('mongoose');

const LoanModel = model('loans', new Schema({
  userId: {
    type: String, required: true,
  },
  commodityId: {
    type: String, required: true,
  },
  commodityName: String,
  customerName: String,
  nik: {
    type: String, required: true,
  },
  warehouse: String,
  quantity: {
    type: Number, default: 0,
  },
  price: {
    type: Number, default: 0,
  },
}, {
  timestamps: true,
}));

module.exports = LoanModel;
