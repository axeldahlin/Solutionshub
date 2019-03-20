const express = require('express');
const Vote = require('../models/Vote')
const PullRequest = require('../models/PullRequest')
const router = express.Router();

//Vote for a user
router.post('/vote', (req, res, next) => {
  // console.log("Vote route called!", req.body)
  const newVote = new Vote({
    _user: req.user._github,
    _pull: req.body._pull,
    _repo: req.body._repo
  })
  newVote.save()
  .then(vote=>{
    res.json({vote, message: "vote cast"})
  })
  .catch(err=>{
    console.log("ERROR at Vote:", err)
    next(err)
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