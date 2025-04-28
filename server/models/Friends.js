const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  name: String,
  phone: String,
  balance: Number,
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
});

module.exports = mongoose.model("Friend", friendSchema);
