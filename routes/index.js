var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    User = require('../model/user'),
    passport = require('./passport');

// Inedex page
router.get('/', isAuthenticated, function(req, res, next) {
   var username = req.user;
   User.getTabs(username, function(data){
      res.render('index', {
         dashboards: data.dashboards[0].tabs,
         theme: data.preferences[0].theme
      });
   });
});

router.get('/login', function(req, res, next) {
   if(req.user) {
      res.redirect('/');
   } else {
      res.render('login', {message: req.session.messages});
      req.session.messages = null;
   }
});

router.get('/logout', function(req, res){
   if(req.user)
      req.logOut();
   res.redirect('/login');
});

router.post('/login', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect:'/login',
   failureFlash: 'Invalid username or password.'
}));

router.get('/dashboards', function(req, res, next) {
   var username = req.user || 'ashok.kumar6@wipro.com';
   User.getDashboard(username, function(data){
     console.log(data);
      res.send(data);
   });
});

function isAuthenticated(req, res, next) {
    if (req.user)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT to login page
    res.redirect('/login');
}
module.exports = router;
