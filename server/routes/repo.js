const express = require('express');
const Repo = require('../models/Repo')
const PullRequest = require('../models/PullRequest')
const Vote = require('../models/Vote')
const axios = require('axios');
const RepoComment = require('../models/RepoComment')
const router = express.Router();

let authPath = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`

// Fetches all repos from database and returns JSON
router.get('/', (req, res, next) => {
  Repo.find()
    .then(repos => {
      res.json(repos);
    })
    .catch(next)
});

router.get('/onerepo/:reponame',(req,res,next)=>{
  Repo.find({name: req.params.reponame})
    .then(repo=>{
      res.json(repo)
    })
    .catch(next)
});

//Fetches all pull requests for given repo and returns JSON
// :repo is Github Repo name
router.get('/pulls/:repo/:repo_id', (req,res,next)=> {
  let pullsPromise = PullRequest.find({repoName: req.params.repo}).lean() // The .lean() is used to send plain objects instead of rigid documents
  let votesPromise = Vote.find({_repo: req.params.repo_id})
  Promise.all([pullsPromise,votesPromise])
  .then(([pulls,votes]) => {
    let pullsWithVotes = pulls.map(pull=>{
      let likedByUser = votes.filter(vote=>{
        return req.user && Number(vote._user) === Number(req.user._github) && Number(vote._pull) === Number(pull.pullRequestID)
      }).length === 1; 
      let nbOfVotes = votes.filter(vote=>vote._pull === pull.pullRequestID).length
      pull.nbOfVotes = nbOfVotes
      pull.likedByUser = likedByUser
      return pull
    })
    res.json(pullsWithVotes)
  })
  .catch(next)
});

// Fetches all repos with github api and updates database
router.get('/repos', (req,res,next)=> {
  axios.get(`https://api.github.com/orgs/ironhack-labs/repos` + authPath + '&per_page=100')
  .then(response => {
    response.data.forEach(githubRepo => {
      Repo.findOneAndUpdate({githubID: githubRepo.id}, {
        name: githubRepo.name,
        githubID: githubRepo.id,
        url: githubRepo.html_url
      }, {
        upsert: true,
        new: true
      })
      // .then(repo => res.json({message: "success"}))
      .catch(err => console.log('DEBUG findOneAndUpdate err:', err))
    })
  })
  .catch(err=>console.log("error at /repos:", err))
});

// Fetches all Pull Requests for given :repo with github api and updates database
router.get('/update-pulls/:repo', (req,res,next)=>{
  axios.get('https://api.github.com/repos/ironhack-labs/'+req.params.repo+'/pulls' + authPath + '&per_page=100')
  .then(response => {
    response.data.forEach(githubPulls => {
      PullRequest.findOneAndUpdate({pullRequestID: githubPulls.id}, {
        pullRequestID: githubPulls.id,
        title: githubPulls.title,
        url: githubPulls.html_url,
        number: githubPulls.number,
        _githubRepo: githubPulls.base.repo.id,
        _githubUsername: githubPulls.user.login,
        repoName: githubPulls.base.repo.name,
        updated_at: githubPulls.updated_at
      }, {
        upsert: true,
        new: true
      })
      .then(pull=> res.json())
      .catch(err=> console.log("ERROR at forEach Pulls",err))
    })
  })
  .catch(err=>console.log("Error at /update-pulls/:repo", err))
})

// Post a repoComments
router.post('/repo-comment', (req, res, next) => {
  const {_user, comment, _repo, githubName, date, imgUrl} = req.body;
  const newComment = new RepoComment({ _user, comment, _repo, githubName, date, imgUrl});
  newComment.save()
    .then(repoComment => {
      res.json(repoComment);
    })
    .catch(next)
});

// Get all repoComments
router.get('/repo-comment/:id', (req,res,next)=> {
  RepoComment.find({_repo: req.params.id})
  .then(repoComments => {
    res.json(repoComments)
  })
  .catch(next)
})

// Delete one repoComment
router.delete('/repo-comment/:id', (req,res,next)=> {  
  RepoComment.findByIdAndRemove(req.params.id)
  .then(repoComment => {
    res.json({message: 'repoMessage deleted'})
  })
  .catch(next)
})

module.exports = router;
