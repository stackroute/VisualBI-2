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
  var userid;
  if(typeof req.body.userid === 'undefined') {
    userid = req.user._id;
  } else {
    userid = req.body.userid;
  }

  Widget.saveWidget(userid, req.body.tabs, req.body.tabIndex,User);
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
    Widget.getWidget(function(data){
         res.send(data);
      });
});

module.exports = router;
