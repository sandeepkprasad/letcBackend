const mongoose = require("mongoose");

const connectDB = () => {
  let URI =
    "mongodb+srv://sandeepkprasad:success2022@mycluster.s12lxcc.mongodb.net/?retryWrites=true&w=majority";

  mongoose.connect(URI);
};

module.exports = connectDB;
