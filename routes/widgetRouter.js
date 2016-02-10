var express = require('express'),
    router = express.Router(),
    utils = require('./utils'),
    path = require('path'),
    Widget =require('../config/db').widgetModel,
    User = require('../config/db').userModel;

router.use(utils.isAuthenticated);

//Get the widgets
router.get('/', function(req, res, next) {
    console.log('Root Route');
    Widget.getWidgets(function(data){
         res.send(data);
      });
});

router.get('/getNewWidgetId', function(req, res, next) {
  Widget.getNewWidgetId(function(id) {
    res.send(id);
  });
});

router.post('/saveWidget', function(req, res, next) {
  var userid;
  if(typeof req.body.userid === 'undefined') {
    userid = req.user._id;
  } else {
    userid = req.body.userid;
  }

  Widget.saveWidget(userid, req.body.tabs, req.body.widgetList, User);
  res.send({resp:"Widgets updated successfully"});
 });


router.post('/renameTitle', function(req, res, next) {
  Widget.renameTitle(req.body.widgetId, req.body.title);
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
