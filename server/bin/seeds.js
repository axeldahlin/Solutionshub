// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js


const axios = require('axios');


require('dotenv').config()

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const PullRequest = require("../models/PullRequest");
const Repo = require("../models/Repo");

const bcryptSalt = 10;

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
  console.log("pull.head.repo",pull.head.repo)
  return {
    title: pull.title,
    url: pull.html_url,
    // _githubRepo: pull.head.repo.id
  }
})

console.log("pulls",pulls.length)


// let pullRequests = []

// for (let i = 0; i < Pulls.length; i++) {

//   axios.get(`https://api.github.com/orgs/ironhack-labs/${repos[i].name}/pulls`)
//   .then(data => {
//     console.log('DEBUG data:', data)
//   })



// }

// console.log("repos",repos)




// User.deleteMany()
//   .then(() => {
//     return User.create(users)
//   })
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created with the following id:`);
//     console.log(usersCreated.map(u => u._id));
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })


// Repo.deleteMany()
// .then(() => {
//   return Repo.create(repos)
// })
// .then(reposCreated => {
//   console.log(`${reposCreated.length} repos created with the following id:`);
//   console.log(reposCreated.map(r => r._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })

// let allPulls;

// repos.forEach(repo => {
//   axios.get('https://api.github.com/repos/ironhack-labs/'+repo.name+'/pulls')
//     .then(axiosPulls => {
//       console.log("axiosPulls",axiosPulls)
//       pulls = axiosPulls.map(axiosPull => {
//         return {
//           title: axiosPull.title,
//           url: axiosPull.html_url,
//           _githubRepo: repo.githubID
//         }
//         allPulls = [...allPulls, ...pulls]
//       })
//       console.log("pulls",pulls) 
//     })
//     .catch(err=> {
//       console.log("error at axios GET",err)
//     })
// })

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





// Repo.find()
//   .then(repos=>{
//     repos.forEach(repo=>{
//       axios.get('https://api.github.com/repos/ironhack-labs/'+repo.name+'/pulls')
//         .then(pulls=>{
//           pulls.forEach(pull=>{

//           })
//         })
//     })
//   })

// repos.forEach(repo=>{
//   console.log("repos: ", repos)
//   console.log("for Each loop repo: ", repo)
//   axios.get('https://api.github.com/repos/ironhack-labs/'+repo.name+'/pulls')
//     .then(pulls => {
//       console.log("pulls",pulls)
//       pulls.forEach(pull=> {
//         pull._repo = repo._id
//         pullRequests.push(pull)
//         console.log("pullRequests", pullRequests)
//       })
//     })
//     .catch(err=>{
//       console.log("error with Repos for each loop")
//     })
// })














