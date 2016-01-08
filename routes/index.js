var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var User = require('../model/user');

var Userd = new User();
// Inedex page
router.get('/', function(req, res, next) {
   Userd.getDashboard('ashok.kumar6@wipro.com', function(data){
      res.render('index', {
         dashboards: data
      });
   });
});

module.exports = router;
