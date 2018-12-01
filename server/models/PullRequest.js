const mongoose = require('mongoose');

const pullRequestSchema = new mongoose.Schema({
  title: {
    type: String
  },
  pullRequestID: Number,
  url: {
    type: String,
    required: true,
  },
  // comments: [String],
  // votes: Number,
  _githubRepo: Number,
  repoName: String
});

const PullRequest = mongoose.model('PullRequest', pullRequestSchema);

module.exports = PullRequest;