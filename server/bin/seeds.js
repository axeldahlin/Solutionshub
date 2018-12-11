// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js


require('dotenv').config()
const mongoose = require("mongoose");
const PullRequest = require("../models/PullRequest");
require('../configs/database')
let seedRepos = require('./ironhack_repos_reduced.json')

let repos = seedRepos.map(repo => {
  return {
    githubID: repo.id,
    name: repo.name,
    url: repo.html_url
  }
})


let seedPulls = require('./pulls1.json');

let pulls = seedPulls.map(pull => {
  return {
    title: pull.title,
    url: pull.html_url,
  }
})

PullRequest.find()
.then(()=>{
  return PullRequest.create(pulls)
})
.then(pullsCreated=>{
  console.log(pullsCreated.map(p => p._id))
})
.then(()=>{
  mongoose.disconnect();
})
.catch(err=>{
  mongoose.disconnect();
  throw err
})