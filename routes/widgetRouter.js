var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    Widget =require('../config/db').widgetModel,
    User = require('../config/db').userModel;


//Get the widgets
router.get('/', function(req, res, next) {
    console.log('Root Route');
    Widget.getWidgets(function(data){
         res.send(data);
      });
});

router.post('/saveWidget', function(req, res, next) {
  Widget.saveWidget(req.user._id,req.body.tabs, req.body.tabIndex,User);
  res.send({resp:"Widgets updated successfully"});
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
