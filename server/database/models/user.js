const { Schema, model } = require('mongoose');

const UserModel = model('users', new Schema({
  email: { type: String, unique: true, required: true },
  profileName: { type: String },
  photo: { type: String, default: 'default.png' },
  password: { type: String },
}, {
  timestamps: true,
}));

module.exports = UserModel;
