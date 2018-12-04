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
  // console.log("Vote route called!", req.body)
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
  Vote.findOneAndDelete({$and: [{_user: req.body._user},{_pull:req.body._pull}]})
  .then(deletedVote => {
    console.log("vote deleted", deletedVote)
    res.json({deletedVote, message: "vote deleted"})
  })
  .catch(err=> {
    console.log("Error at UNVOTE", err)
  })
})


router.post('/inc-pull-votes/', (req, res, next) => {



  console.log('DEBUG !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

  let {pullRequestID, increment} = req.body;

  let inc = -1;
  if (increment) {
    inc = 1
  }
  PullRequest.findOneAndUpdate({pullRequestID: pullRequestID},{ $inc: { nbOfLikes: inc} })
})



module.exports = router;