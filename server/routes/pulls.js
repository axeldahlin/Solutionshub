//Routes for the pull requests

const express = require('express');
const Repo = require('../models/Repo')
const Vote = require('../models/Votes')
const PullRequest = require('../models/PullRequest')
const axios = require('axios');
const router = express.Router();


let authPath = '?client_id=' + process.env.GITHUB_CLIENT_ID + '&client_secret='+process.env.GITHUB_CLIENT_SECRET





//Check for all votes (expects an array of pulls)
router.post('/getvotes',(req,res,next)=>{
  Vote.find({$and: [{_user: req.body._user},{_repo:req.body._repo}]})
  .then(votesFromUser => {
    console.log("votesFromUser",votesFromUser)
    res.json(votesFromUser)
    
    // let newPulls = pulls.map(pull => {
    //   votesFromUser.forEach(vote=> {
    //     if (vote._pull === pull.pullRequestID) pull.likedByUser = true;
    //     else pull.likedByUser = false
    //   })
    //   return pull
    // })
    // let response = []
    // votesFromUser.forEach(vote => {
    //   let matching = pulls.filter(pull=>vote._pull === pull.pullRequestID)
    //   matching.forEach(matchingPull=> {
    //     matchingPull.likedByUser = true;
    //     response.push(matchingPull)
    //   })
    // })
  })
  .catch(err=>{
    console.log("Error at /getVotes",err)
  })
})



//Check for single vote
router.post('/getvote', (req,res,next)=>{
  // console.log("Get vote is called")
  Vote.find({$and: [{_user: req.body._user},{_pull:req.body._pull}]})
  .then(vote=>{
    if(vote.length) res.json({state: true})
    else res.json({state:false})
  })
  .catch(err=>{
    console.log("Error at /getvote", err)
  })
})


//Vote for a user
router.post('/vote', (req, res, next) => {
  const newVote = new Vote({
    _user: req.body._user,
    _pull: req.body._pull,
    _repo: req.body._repo
  })
  newVote.save()
  .then(vote=>{
    res.json({vote, message: "vote cast"})
  })
  .catch(err=>{
    console.log("ERROR at Vote:", err)
  })
})


//Unvote for a user
router.post('/unvote', (req,res,next)=>{
  // Vote.findOneAndDelete({
  //   _user: req.body._user,
  //   _pull: req.body._pull
  // })
  Vote.findOneAndDelete({$and: [{_user: req.body._user},{_pull:req.body._pull}]})
  .then(deletedVote => {
    console.log("vote deleted", deletedVote)
    res.json({deletedVote, message: "vote deleted"})
  })
  .catch(err=> {
    console.log("Error at UNVOTE", err)
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