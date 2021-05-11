const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  dateAdded: { type: Date, default: Date.now}
});

module.exports = user = new mongoose.model('User', userSchema);
