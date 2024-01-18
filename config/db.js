const mongoose = require('mongoose');
require('dotenv').config();
const connectToMongo = async () => {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("KẾT NỐI DATABASE THÀNH CÔNG");
};

module.exports = connectToMongo;