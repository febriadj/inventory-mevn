const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/inventory';
    await mongoose.connect(uri);

    console.log('mongodb connected');
  }
  catch (error0) {
    console.error(error0.message);
  }
}
