const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: [true, 'Please provide a project id'],
  },
  chapterId: {
    type: String,
    required: [true, 'Please provide a chapter Id'],
  },
  content: {
    type: String,
    required: [true, 'Please provide chapter content'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Content', contentSchema);