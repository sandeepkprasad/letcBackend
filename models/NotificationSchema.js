const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  notification: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notification", NotificationSchema);
