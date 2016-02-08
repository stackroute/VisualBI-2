var express = require('express');
var router = express.Router();
var util = require('./utils');
var path = require('path');
var Widget =require('../config/db').widgetModel;

router.get('/:chartType', function(req, res, next) {
   // picks :chartType from the URL
   var chartType = req.params.chartType;
   var filePath = path.join(__dirname, '../public/data/chartdata/' + chartType + ".json");
      var chartJsonData = util.readFile(filePath);
      res.json(chartJsonData);
});


module.exports = router;
