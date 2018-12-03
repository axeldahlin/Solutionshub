const express = require('express');
const Repo = require('../models/Repo')
const PullRequest = require('../models/PullRequest')
const axios = require('axios');

const router = express.Router();



let authPath = '?client_id=' + process.env.GITHUB_CLIENT_ID + '&client_secret='+process.env.GITHUB_CLIENT_SECRET






// Fetches all repos from database and returns JSON
router.get('/', (req, res, next) => {
  Repo.find()
    .then(repos => {
      res.json(repos);
    })
    .catch(err => next(err))
});



// //Get one pull request
// router.get('/pull-detail/:pullId', (req,res,next)=> {

//   PullRequest.findById({req.params.pullId})
//   .then(pull => {
//     res.json(pull)
//   })
//   .catch(err => next(err))
// })





//Fetches all pull requests for given repo and returns JSON
// :repo is Github Repo name
router.get('/pulls/:repo', (req,res,next)=> {
  PullRequest.find({repoName: req.params.repo})
  .then(pulls => {
    res.json(pulls)
  })
  .catch(err => next(err))
})



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
      // .then(repo => console.log('DEBUG SUCCES :) repo:', repo))
      .catch(err => console.log('DEBUG findOneAndUpdate err:', err))
    })
  })
  .catch(err=>console.log("error at /repos:", err))
})


// Fetches all Pull Requests for given :repo with github api and updates database
router.get('/update-pulls/:repo', (req,res,next)=>{
  console.log("update pulls called for repo: ", req.params.repo)
  axios.get('https://api.github.com/repos/ironhack-labs/'+req.params.repo+'/pulls' + authPath + '&per_page=100')
  .then(response => {
    response.data.forEach(githubPulls => {
      PullRequest.findOneAndUpdate({pullRequestID: githubPulls.id}, {
        pullRequestID: githubPulls.id,
        title: githubPulls.title,
        url: githubPulls.html_url,
        _githubRepo: githubPulls.base.repo.id,
        repoName: githubPulls.base.repo.name
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




module.exports = router;
