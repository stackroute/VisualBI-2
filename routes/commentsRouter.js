var express = require('express'),
    router = express.Router(),
    utils = require('./utils'),
    path = require('path'),
    Widget =require('../config/db').widgetModel,
	 dbUtils = require('../model/dbUtils');

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
	}).then(function(err, comment) {
		if(err) res.status(500).send("Failed to update comments")
		else res.sendStatus(200);
	});

});

//gets the comments for a widget
router.get('/:widgetId', function(req, res, next) {
	
	Widget.getComments(req.params.widgetId)
	.then(function(widget) {
		res.status(200).json(widget);
	})
})

//get commenters for a widget
router.get('/commenters/:widgetId',function(req,res,next){
	Widget.getCommenters(req.params.widgetId,function(data){
		res.send(data);
	});

});


module.exports=router;
