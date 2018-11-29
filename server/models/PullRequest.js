const mongoose = require('mongoose');

const pullRequestSchema = new mongoose.Schema({
  title: {
    type: String
  },
  url: {
    type: String,
    required: true,
  },
  comments: [String],
  votes: Number,
  _repo: {type: Schema.Types.ObjectId, ref: "Repo"}
});

const PullRequest = mongoose.model('PullRequest', pullRequestSchema);

module.exports = PullRequest;