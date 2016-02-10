var express = require('express'),
    router = express.Router(),
    utils = require('./utils'),
    path = require('path'),
    WidgetMdx =require('../config/db').widgetMdxModel;

//Checks wheather user is authenticated 
router.use(utils.isAuthenticated);

//Get the widgets
router.get('/', function(req, res, next) {
    WidgetMdx.getWidgets(function(data){
         res.send(data);
      });
});

module.exports = router;
