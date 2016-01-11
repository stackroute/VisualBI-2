var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../model/user');

passport.use(new LocalStrategy(function(username, password, done) {
      User.findById(username, function(err, user) {
         if(!user)
            return done(null, false, {message: "The user doesn't exists"});
         else if(user.pwd !== password) {
            return done(null, false, {message: "wrong password"});
         } else {
            return done(null, user.emailId);
         }
      });
}));

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
      done(null, user.emailId);
   });
});

module.exports = passport;
