var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    passport = require('passport'),
    utils = require('./utils'),
    User = require('../model/user'),
    LocalStrategy = require('passport-local');

var userId;
// Inedex page
router.get('/', function(req, res, next) {
   var username = userId || 'ashok.kumar6@wipro.com';
   User.getTabs(username, function(data){
     console.log("display data " + data);
      res.render('index', {
         dashboards: data.dashboards[0].tabs,
         theme: data.preferences[0].theme
      });
   });
});

router.get('/login', function(req, res, next) {
   res.render('login');
});

router.post('/login', function(req, res, next) {
   var username = req.body.username,
      password = req.body.password;

   User.findById(username, function(err, user){
      if(user) {
         res.redirect('/')
      } else {
         res.redirect('/login');
      }

   });

});

router.get('/dashboards', function(req, res, next) {
   var username = userId || 'ashok.kumar6@wipro.com';
   User.getDashboard(username, function(data){
      res.send(data);
   });
});

module.exports = router;
