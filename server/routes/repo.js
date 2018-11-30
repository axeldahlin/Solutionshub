const express = require('express');
const Repo = require('../models/Repo')
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
      .then(repo => console.log('DEBUG SUCCES :) repo:', repo))
      .catch(err => console.log('DEBUG findOneAndUpdate err:', err))
    })
  })
  .catch(err=>console.log("error at /repos:", err))
})






///////////////////////////////////////////////////



// Route to add a country
router.post('/', (req, res, next) => {
  let { name, capitals, area, description } = req.body
  Country.create({ name, capitals, area, description })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err))
});

module.exports = router;
