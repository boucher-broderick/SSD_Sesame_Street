const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a project name'],
  },
  author: {
    type: String,
    required: [true, 'Please provide project author'],
  },
  created: {
    type: Date,
    required: [true, 'Please provide project creation date'],
  },
  description: {
    type: String,
    required: [true, 'Please provide project description'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);