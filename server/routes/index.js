const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();


router.get('/',(req,res,next)=>{
  console.log("/ called!!!!")
  console.log(req.user)
})

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

module.exports = router;
