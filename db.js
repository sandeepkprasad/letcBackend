const mongoose = require("mongoose");

const connectDB = () => {
  let URI = "mongodb://localhost:27017/letc";

  mongoose.connect(URI);
};

module.exports = connectDB;
