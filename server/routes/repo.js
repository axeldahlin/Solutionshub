const express = require('express');
const Repo = require('../models/Repo')

const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/countries');
  next()
})

// GET Route for all repos
router.get('/', (req, res, next) => {
  Repo.find()
    .then(repos => {
      res.json(repos);
    })
    .catch(err => next(err))
});


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
