const { Schema, model } = require('mongoose');

const UserModel = model('users', new Schema({
  email: {
    type: String, unique: true, required: true,
  },
  profileName: String,
  photo: {
    type: String, default: 'default.png',
  },
  password: String,
}, {
  timestamps: true,
}));

module.exports = UserModel;
