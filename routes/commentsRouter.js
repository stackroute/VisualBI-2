var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    Widget =require('../config/db').widgetModel;

router.post('/',function(req,res,next){

	if(req.isAuthenticated()){
		imgSrc=req.user.imagePath;
		
		if(imgSrc=='test path')
			imgSrc='public/images/default-user.png';
		
		
		Widget.postComment(req.user.name, req.body.widgetid, req.body.comment,req.body.commentType,req.body.commentCategory,imgSrc);
		res.send({resp:'success',user:req.user.name,image:req.user.imagePath});
	}
	else
		res.send({resp:'error',msg:'Authentication failure'});
});

router.get('/:widgetId',function(req,res,next){
	Widget.getCommenters(req.params.widgetId,function(data){
		res.send(data);
	});

});

router.post('/updateCommenterInfo',function(req,res,next){

	Widget.updateCommenterDetails(req.body.widgetId, req.body.userid,function(resp){
		res.send({resp:'success',user:req.user.name});
	});
});



module.exports=router;
