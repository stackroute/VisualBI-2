var express = require('express');
var router = express.Router();
var util = require('./utils');
var path = require('path');


router.get('/:chartType', function(req, res, next) {
   // picks :chartType from the URL
   var chartType = req.params.chartType;
   // console.log("Requested chartType : " + chartType);

   var filePath = path.join(__dirname, '../public/data/chartData/' + chartType + ".json");
   var chartJsonData = util.readFile(filePath);
   res.send(chartJsonData);
});

module.exports = router;
