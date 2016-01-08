var express = require('express');
var router = express.Router();
var util = require('./utils');
var path = require('path');
var WidgetModel = require('../model/widget');

router.get('/:chartType', function(req, res, next) {
   // picks :chartType from the URL
   var chartType = req.params.chartType;

   if(chartType === "widgets") {

      var Widget = new WidgetModel();
      Widget.getWidgets(function(data){
         res.send(data);
      });
   } else {
      var filePath = path.join(__dirname, '../public/data/chartData/' + chartType + ".json");
      var chartJsonData = util.readFile(filePath);
      res.send(chartJsonData);
   }


});

module.exports = router;
