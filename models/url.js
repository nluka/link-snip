const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    require: true,
    default: 0
  }
});

module.exports = mongoose.model('url', urlSchema);
