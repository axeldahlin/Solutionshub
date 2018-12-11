const mongoose = require('mongoose');

const pullRequestSchema = new mongoose.Schema({
  title: {
    type: String
  },
  _githubUsername: String,
  pullRequestID: Number,
  number: Number,
  url: {
    type: String,
    required: true,
  },
  _githubRepo: Number,
  repoName: String,
  repoUrl: String,
  nbOfVotes:  { type: Number, default: 0 },
  updated_at: Date,
  likedByUser: Boolean
});

const PullRequest = mongoose.model('PullRequest', pullRequestSchema);

module.exports = PullRequest;