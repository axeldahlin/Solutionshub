const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  githubID: Number,
  name: {
    type: String,
    required: [true, 'The repo name is required'],
    minlength: 1
  },
  url: {
    type: String,
    required: true,
  }
});

const Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;