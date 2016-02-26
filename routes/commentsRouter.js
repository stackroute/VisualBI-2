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
    * 2. Partha Mukherjee
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
    Widget =require('../config/db').widgetModel;

//Checks wheather user is authenticated 
router.use(utils.isAuthenticated);

//updates comments for widget
router.post('/',function(req, res, next){
	
	Widget.saveComment(req.body.widgetid, {
		userid: req.user._id,
		comment: req.body.comment,
		badgeIconClass: req.body.commentType,
		badgeClass: req.body.commentCategory,
		displayName: req.user.displayName,
		userImage: req.user.imagePath,
		datetime: new Date(),
	}).then(function(comment) {
		res.status(200).send(comment);
	});

});

//updates comments for widget
router.post('/updateComment',function(req, res, next){

	Widget.updateComment({commentId: req.body.commentId,
						  comment: req.body.comment,
						  badgeIconClass: req.body.commentType,
						  badgeClass: req.body.commentCategory})
		.then(function(comment) {
		res.status(200).send(comment);
	});

});
//gets the comments for a widget
router.get('/:widgetId', function(req, res, next) {
	
	Widget.getComments(req.params.widgetId)
	.then(function(widget) {
		res.status(200).json(widget);
	});
});

//get commenters for a widget
router.get('/commenters/:widgetId',function(req,res,next){
	Widget.getCommenters(req.params.widgetId,function(data){
		res.send(data);
	});

});


module.exports=router;
