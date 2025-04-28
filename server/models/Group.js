const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
});

module.exports = mongoose.model("Group", groupSchema);
