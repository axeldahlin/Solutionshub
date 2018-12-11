const passport = require('passport');
const User = require('../models/User');
var GitHubStrategy = require('passport-github').Strategy;
 
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ _github: profile.id })
    .then(user => {
      if (user) {
        return cb(null, user);
      }
      
      const newUser = new User({
        _github: profile.id,
        githubName: profile.displayName,
        githubUsername: profile.username,
        githubBio: profile._json.bio,
        githubImageUrl: profile.photos[0].value,
        githubUrl: profile.profileUrl
      });

      newUser.save()
      .then(user => {
        console.log("user",user)
        cb(null, newUser);
      })
    })
    .catch(error => {
      console.log('DEBUG error:', error)
      next(error)
    })
  }
));