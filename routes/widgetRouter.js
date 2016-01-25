var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    Widget = require('../model/widget');


//Get the widgets
router.get('/', function(req, res, next) {
    
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


//router.get('/:chartType', function(req, res, next) {
//   // picks :chartType from the URL
//   var chartType = req.params.chartType;
//
//   if(chartType === "widgets") {
//      Widget.getWidgets(function(data){
//         res.send(data);
//      });
//   } else {
//      var filePath = path.join(__dirname, '../public/data/chartData/' + chartType + ".json");
//      var chartJsonData = util.readFile(filePath);
//      res.send(chartJsonData);
//   }
//
//
//});

module.exports = router;
