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





let pullRequests = []

for (let i = 0; i < repos.length; i++) {

  axios.get(`https://api.github.com/orgs/ironhack-labs/${repos[i].name}/pulls`)
  .then(data => {
    console.log('DEBUG data:', data)
  })



}

console.log("repos",repos)

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



User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })


Repo.deleteMany()
.then(() => {
  return Repo.create(repos)
})
.then(reposCreated => {
  console.log(`${reposCreated.length} repos created with the following id:`);
  console.log(reposCreated.map(r => r._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})













