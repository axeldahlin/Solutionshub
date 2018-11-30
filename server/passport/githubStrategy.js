const passport = require('passport');
const User = require('../models/User');
var GitHubStrategy = require('passport-github').Strategy;
 
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ _github: profile.id })
    .then(user => {
      console.log("profile",profile)
      // if (err) {
      //   return cb(err);
      // }
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




// passport.use(new LocalStrategy({
//   usernameField: 'username',
//   passwordField: 'password'
// },
//   (username, password, done) => {
//     User.findOne({ username })
//       .then(foundUser => {
//         if (!foundUser) {
//           done(null, false, { message: 'Incorrect username' });
//           return;
//         }

//         if (!bcrypt.compareSync(password, foundUser.password)) {
//           done(null, false, { message: 'Incorrect password' });
//           return;
//         }

//         done(null, foundUser);
//       })
//       .catch(err => done(err));
//   }
// ));
