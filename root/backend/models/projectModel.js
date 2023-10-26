const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide project description'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);