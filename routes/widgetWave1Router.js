var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    WidgetWave1 =require('../config/db').widgetWave1Model;


//Get the widgets
router.get('/', function(req, res, next) {
    WidgetWave1.getWidgets(function(data){
         res.send(data);
      });
});

module.exports = router;
