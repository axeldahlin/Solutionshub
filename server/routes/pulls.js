//Routes for the pull requests

const express = require('express');
const Repo = require('../models/Repo')
const Vote = require('../models/Votes')
const PullRequest = require('../models/PullRequest')
const axios = require('axios');
const router = express.Router();


let authPath = '?client_id=' + process.env.GITHUB_CLIENT_ID + '&client_secret='+process.env.GITHUB_CLIENT_SECRET



//Vote
router.post('/vote', (req, res, next) => {
  console.log("Vote route called!")
  const newVote = new Vote({
    _user: req.body._user,
    _pull: req.body._pull
  })
  newVote.save()
  .then(vote=>{
    res.json({vote, message: "vote cast"})
  })
  .catch(err=>{
    console.log()
  })
})
  // const newVote = new Vote({
  //   _user: req.body._id,
  //   _pull: req.body._pull
  // })



// const newUser = new User({
//   _github: profile.id,
//   githubName: profile.displayName,
//   githubUsername: profile.username,
//   githubBio: profile._json.bio,
//   githubImageUrl: profile.photos[0].value,
//   githubUrl: profile.profileUrl
// });

// newUser.save()
// .then(user => {
//   console.log("user",user)
//   cb(null, newUser);
// })






module.exports = router;