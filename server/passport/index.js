const passport = require('passport');





require('./serializers');
require('./githubStrategy');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
}

