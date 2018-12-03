const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  _user: String,
  _pull: String,
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;