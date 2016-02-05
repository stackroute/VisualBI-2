var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    Widget = require('../model/widget');


//Get the widgets
router.get('/', function(req, res, next) {
    console.log('Root Route');
    Widget.getWidgets(function(data){
         res.send(data);
      });
});

//Get the widget details
router.get('/:id', function(req, res, next) {
   // picks :id from the URL
   var widgetId = req.params.id;
    
    Widget.getWidget(widgetId, function(data){
         res.send(data);
      });
});

//get chartdata for respective widget
router.get('/data/:id', function(req, res, next) {
   // picks :id from the URL
   var widgetId = req.params.id;
    console.log("widget", widgetId);
    Widget.getWidget(function(data){
        console.log(data);
         res.send(data);
      });
});

module.exports = router;
