//Routes for the pull requests

const express = require('express');
const Vote = require('../models/Votes')
const PullRequest = require('../models/PullRequest')
const router = express.Router();




// //Fetches all pull requests for given repo and returns JSON
// // :repo is Github Repo name
// router.get('/:repo/:repo_id', (req,res,next)=> {
//   let pullsPromise = PullRequest.find({repoName: req.params.repo})
//   let votesPromise = Vote.find({_repo: req.params.repo_id})
//   Promise.all([pullsPromise,votesPromise])
//   .then(results => {
//     let [pulls,votes] = results
//     let pullsWithVotes = pulls.map(pull=>{
//       let likedByUser = votes.filter(vote=>{
//         return Number(vote._user) === Number(req.user._github) && Number(vote._pull) === Number(pull.pullRequestID)
//       }).length === 1; 
//       let nbOfVotes = votes.filter(vote=>vote._pull === pull.pullRequestID).length
//       pull.nbOfVotes = nbOfVotes
//       pull.likedByUser = likedByUser
//       return pull
//     })
//     res.json(pullsWithVotes)
//   })
//   .catch(next)
// })



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
    res.json({deletedVote, message: "vote deleted"})
  })
  .catch(err=> {
    console.log("Error at UNVOTE", err)
  })
})

// //Get one pull request
router.get('/pull-detail/:pullId', (req,res,next)=> {
  const id = req.params.pullId
  PullRequest.findOne({pullRequestID: id})
  .then(pull => {
    res.json(pull)
  })
  .catch(next)
})

module.exports = router;