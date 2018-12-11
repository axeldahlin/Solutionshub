const express = require('express');
const PullRequest = require('../models/PullRequest')
const Vote = require('../models/Votes')
const router = express.Router();


router.get('/userpulls/:username', (req,res,next)=>{
  let userPullsPromise = PullRequest.find({_githubUsername: req.params.username})
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


//Fetches all pull requests for given repo and returns JSON
// :repo is Github Repo name
router.get('/pulls/:repo/:repo_id', (req,res,next)=> {
  let pullsPromise = PullRequest.find({repoName: req.params.repo})
  let votesPromise = Vote.find({_repo: req.params.repo_id})
  Promise.all([pullsPromise,votesPromise])
  .then(results => {
    let [pulls,votes] = results
    let pullsWithVotes = pulls.map(pull=>{
      let likedByUser = votes.filter(vote=>{
        return Number(vote._user) === Number(req.user._github) && Number(vote._pull) === Number(pull.pullRequestID)
      }).length === 1; 
      let nbOfVotes = votes.filter(vote=>vote._pull === pull.pullRequestID).length
      pull.nbOfVotes = nbOfVotes
      pull.likedByUser = likedByUser
      return pull
    })
    res.json(pullsWithVotes)
  })
  .catch(next)
})


module.exports = router;
