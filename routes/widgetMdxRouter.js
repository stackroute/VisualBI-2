var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    WidgetMdx =require('../config/db').widgetMdxModel;


//Get the widgets
router.get('/', function(req, res, next) {
    WidgetMdx.getWidgets(function(data){
         res.send(data);
      });
});

module.exports = router;
