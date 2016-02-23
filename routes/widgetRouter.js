/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
var express = require('express'),
    router = express.Router(),
    utils = require('./utils'),
    path = require('path'),
    Widget =require('../config/db').widgetModel,
    User = require('../config/db').userModel;

router.use(utils.isAuthenticated);

//Get the widgets
router.get('/', function(req, res, next) {
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
//router.get('/:id', function(req, res, next) {
//   // picks :id from the URL
//   var widgetId = req.params.id;
//
//    Widget.getWidget(widgetId, function(data){
//         res.send(data);
//      });
//});

//get chartdata for respective widget
//router.get('/data/:id', function(req, res, next) {
//   // picks :id from the URL
//   var widgetId = req.params.id;
//    Widget.getWidget(function(data){
//         res.send(data);
//      });
//});

module.exports = router;
