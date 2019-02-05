const mongoose = require('mongoose');

const repoCommentSchema = new mongoose.Schema({
  _repo: {type: mongoose.Schema.Types.ObjectId, ref: "Repo"},
  _user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  comment: String,
  // githubName: String,
  date: String,
  // imgUrl: String
});

const RepoComment = mongoose.model('RepoComment', repoCommentSchema);

module.exports = RepoComment;