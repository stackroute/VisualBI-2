var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var UserModel = require('../model/user');


// Inedex page
router.get('/', function(req, res, next) {
   var User = new UserModel();
   User.getTabs('ashok.kumar6@wipro.com', function(data){
      res.render('index', {
         dashboards: data
      });
   });
});

router.get('/dashboards', function(req, res, next) {
   var User = new UserModel();
   User.getDashboard('ashok.kumar6@wipro.com', function(data){
      res.send(data);
   });
});

module.exports = router;
