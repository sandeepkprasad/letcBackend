const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
  image: String,
});

module.exports = mongoose.model("banner", BannerSchema);
