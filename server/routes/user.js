const express = require('express');
const PullRequest = require('../models/PullRequest')
const Vote = require('../models/Vote')
const router = express.Router();

router.get('/userpulls/:username', (req,res,next)=>{
  let userPullsPromise = PullRequest.find({_githubUsername: req.params.username}).lean()
  let allVotesPromise = Vote.find()
  Promise.all([userPullsPromise,allVotesPromise])
  .then(result=>{
    [userPulls,allVotes] = result
    let totalVotes = 0
    let userPullsWithVotes = userPulls.map(pull=>{
      let nbOfVotes = allVotes.filter(vote=>vote._pull === pull.pullRequestID).length
      pull.nbOfVotes = nbOfVotes
      totalVotes += nbOfVotes
      return pull
    })
    res.json({userPullsWithVotes, totalVotes})
  })
  .catch(err=>
    console.log("error at /userpulls/:username"))
})

module.exports = router;
