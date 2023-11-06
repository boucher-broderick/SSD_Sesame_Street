const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: [true, 'Please provide a user id'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a project name'],
  },
  author: {
    type: String,
    required: [true, 'Please provide project author'],
  },
  description: {
    type: String,
    required: [true, 'Please provide project description'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);