// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js


const axios = require('axios');


require('dotenv').config()

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Repo = require("../models/Repo");

const bcryptSalt = 10;

require('../configs/database')


let seedRepos = require('./ironhack_repos.json')

let repos = seedRepos.map(repo => {
  return {
    name: repo.name,
    url: repo.html_url
  }
})


let users = [
  {
    username: "alison",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]



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


let pullRequests = []

repos.forEach(repo=>{
  axios.get('https://api.github.com/repos/ironhack-labs/'+repo.name+'/pulls')
    .then(pull => {
      pullRequests.push(pull)
    })
    .catch(err=>{
      console.log("error with Repos for each loop")
    })
})

console.log("pullRequests",pullRequests)



// axios.get('https://api.github.com/orgs/ironhack-labs/repos')
//   .then(data => {
//     console.log('DEBUG data:', data)
//   })





