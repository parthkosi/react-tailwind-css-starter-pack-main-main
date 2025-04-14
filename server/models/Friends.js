const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  name: String,
  phone: String,
  balance: Number,
});

module.exports = mongoose.model("Friend", friendSchema);
