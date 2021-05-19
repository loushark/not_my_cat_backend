const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  catName: {
    type: String,
    required: true
  },
  user_id: {
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
  },
  cattitude: {
    type: Number,
    required: true
  },
  floof: {
    type: Number,
    required: true
  },
  chonk: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  position: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  timesSpotted: {
    type: Number
  },
  wins: {
    type: Number
  }
});

module.exports = cat = new mongoose.model('Cat', catSchema);
