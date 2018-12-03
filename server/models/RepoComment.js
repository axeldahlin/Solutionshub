const mongoose = require('mongoose');

const repoCommentSchema = new mongoose.Schema({
  repo: String,
  _user: mongoose.Schema.Types.ObjectId,
  comment: String
});

const RepoComment = mongoose.model('RepoComment', repoCommentSchema);

module.exports = RepoComment;