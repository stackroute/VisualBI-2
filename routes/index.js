var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var passport = require('passport');
var utils = require('./utils');
var User = require('../model/user');


// Inedex page
router.get('/', function(req, res, next) {
   var username = req.username || 'ashok.kumar6@wipro.com';
   User.getTabs(username, function(data){
      res.render('index', {
         dashboards: data
      });
   });
});

router.get('/login', function(req, res, next) {
   res.render('login');
});

router.post('/login', function(req, res, next) {
   console.log('post request');
   var username = req.body.username,
      password = req.body.password;
   if(!username) {
      res.redirect('/login');
   } else {
      req.username = username;
      res.redirect('/')
   }

});

router.get('/dashboards', function(req, res, next) {
   var username = req.username || 'ashok.kumar6@wipro.com';
   User.getDashboard(username, function(data){
      res.send(data);
   });
});

module.exports = router;
