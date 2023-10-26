const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a chapter title'],
  },
  content: {
    type: String,
    required: [true, 'Please provide chapter description'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Chapter', chapterSchema);