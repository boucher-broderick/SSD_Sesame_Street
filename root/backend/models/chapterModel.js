const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a chapter name'],
  },
  author: {
    type: String,
    required: [true, 'Please provide chapter author'],
  },
  description: {
    type: String,
    required: [true, 'Please provide chapter description'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Chapter', chapterSchema);