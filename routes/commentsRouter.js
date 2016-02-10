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
		datetime: new Date(),
	}).then(function(err, comment) {
		if(err) res.status(500).send("Failed to update comments")
		else res.sendStatus(200);
	});

//	if(req.isAuthenticated()){
//		Widget.postComment(req.user.name, req.body.widgetid, req.body.comment,req.body.commentType,req.body.commentCategory);
//		res.send({resp:'success',user:req.user.name});
//	}
//	else
//		res.send({resp:'error',msg:'Authentication failure'});
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

//Updates commenters details into the mongo for a widget
router.post('/updateCommenterInfo',function(req,res,next){

	Widget.updateCommenterDetails(req.body.widgetId, req.body.userid,function(resp){
		res.send({resp:'success',user:req.user.name});
	});
});



module.exports=router;
