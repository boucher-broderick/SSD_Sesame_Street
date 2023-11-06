const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: [true, 'Please provide a project id'],
  },
  chapterNumber: {
    type: Number,
    required: [true, 'Please provide a chapter number'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a chapter name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide chapter description'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Chapter', chapterSchema);