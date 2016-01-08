var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var User = require('../model/user');


// Inedex page
router.get('/', function(req, res, next) {
   User.getTabs('ashok.kumar6@wipro.com', function(data){
      res.render('index', {
         dashboards: data
      });
   });
});

router.get('/dashboards', function(req, res, next) {
   User.getDashboard('ashok.kumar6@wipro.com', function(data){
      res.send(data);
   });
});

module.exports = router;
