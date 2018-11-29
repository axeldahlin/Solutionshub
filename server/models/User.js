const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  _github: String,
  githubName: String,
  githubUsername: String,
  githubBio: String,
  githubImageUrl: String,
  githubUrl: String,
  password: String,
  role: {type: String, enum: ["admin","student"]}
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
