const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  _user: Number,
  _pull: Number,
  _repo: Number
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;