const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  catName: {
    type: String,
    required: true
  },
  lastSpotted: {
    type: Date,
    default: Date.now
  },
  dateAdded: {
    type: Date, 
    default: Date.now
  }
});

module.exports = cat = new mongoose.model('Cat', catSchema);
