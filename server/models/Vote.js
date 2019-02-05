const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  _user: Number,
  _pull: Number,
  _repo: Number
});
voteSchema.index({_user: 1, _pull: 1, _repo: 1}, {unique: true});


const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;