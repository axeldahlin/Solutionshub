const express = require('express');
const User = require('../models/User')
const PullRequest = require('../models/PullRequest')

const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/countries');
  next()
})



router.get('/userpulls/:username', (req,res,next)=>{
  PullRequest.find({_githubUsername: req.params.username})
  .then(pulls=>{
    res.json(pulls)
  })
  .catch(err=>
    console.log("error at /userpulls/:username"))
})


///////////////////////////////////////////////////SAMPLE ONLY BELOW
// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    .then(countries => {
      res.json(countries);
    })
    .catch(err => next(err))
});

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
