const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  attachment: {
    type: String,
  },
});

module.exports = mongoose.model("Message", messageSchema);
