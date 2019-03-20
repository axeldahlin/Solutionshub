const express = require("express")
const passport = require('passport')
const router = express.Router()

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: process.env.FRONTEND_URI,
    successRedirect: process.env.FRONTEND_URI
  }),(req, res,next) => {
    // Successful authentication, redirect home.
    res.redirect(process.env.FRONTEND_URI);
  });

router.get('/loggedin',(req,res,next)=>{
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({message: 'Unauthorized'})
})

router.get('/isloggedin', (req,res,next)=> {
  if (req.isAuthenticated()){
    res.json({isLoggedIn: true})
  } else {
    res.json({isLoggedIn: false})
  }
  return;
})

router.post('/logout', (req,res,next)=>{
  req.logout();
  res.status(200).json({message: "Log out successful!"})
})

module.exports = router
