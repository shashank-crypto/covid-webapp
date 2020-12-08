const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  mssSub: String,
  mss: String
});

const Message = mongoose.model("Message", contactSchema);
module.exports = Message;