const express = require('express');
const Repo = require('../models/Repo')
const axios = require('axios');

const router = express.Router();



let authPath = '?client_id=' + process.env.GITHUB_CLIENT_ID + '&client_secret='+process.env.GITHUB_CLIENT_SECRET


router.use((req, res, next) => {
  console.log('DEBUG routes/countries');
  next()
})

// GET Route for all repos
router.get('/', (req, res, next) => {
  console.log("/ is pinged")
  Repo.find()
    .then(repos => {

      res.json(repos);
    })
    .catch(err => next(err))
});


router.get('/repos', (req,res,next)=> {
  console.log("/repos is pinged")
  // axios.get(`https://api.github.com/orgs/ironhack-labs/repos?client_id=ef51dc0616f91cc5207e&client_secret=094c6f8cf74d24af7ecade6dbcc1a945d8a5ae0d`)
  axios.get(`https://api.github.com/orgs/ironhack-labs/repos` + authPath)
  .then(response => {
    res.json(response.data)
  })
  .catch(err=>{
    console.log("error at /repos:", err)
  })
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
