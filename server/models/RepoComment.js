const mongoose = require('mongoose');

const repoCommentSchema = new mongoose.Schema({
  _repo: mongoose.Schema.Types.ObjectId,
  _user: mongoose.Schema.Types.ObjectId,
  comment: String,
  githubName: String,
  date: String,
  imgUrl: String
});

const RepoComment = mongoose.model('RepoComment', repoCommentSchema);

module.exports = RepoComment;