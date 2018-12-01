const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const axios = require('axios')


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



router.get('/user/signin/callback', (req, res, next) => {
  const {query} = req;
  const {code} = query;

  if (!code) {
    return res.send({
      success: false,
      message: 'Error: no code'
    })
  }

  // POST

  console.log('code:', code)
  axios.post('https://github.com/login/oauth/access_token',
    {
      client_id: 'ef51dc0616f91cc5207e',
      client_secret: '094c6f8cf74d24af7ecade6dbcc1a945d8a5ae0d',
      code: code
    })
    // .set('Accept', 'application/json')
    .then(function(result) {
      const data = result.body;
      // console.log('DEBUG data:', result)
      res.send(data)
    })



});



module.exports = router;
