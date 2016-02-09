var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    Widget =require('../config/db').widgetModel,
	 dbUtils = require('../model/dbUtils');

//updates comments for widget
router.post('/',function(req,res,next){

	if(req.isAuthenticated()){
		Widget.postComment(req.user.name, req.body.widgetid, req.body.comment,req.body.commentType,req.body.commentCategory);
		res.send({resp:'success',user:req.user.name});
	}
	else
		res.send({resp:'error',msg:'Authentication failure'});
});

//gets the comments for a widget
router.get('/:widgetId', function(req, res, next) {
	dbUtils.getComments(req.params.widgetId)
		.then(function(doc) {
			res.json(doc ? doc.comments : []);	
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
