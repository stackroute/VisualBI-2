var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    Widget = require('../model/widget');

router.post('/',function(req,res,next){
	
	if(req.isAuthenticated()){
		Widget.postComment(req.user.name, req.body.widgetid, req.body.comment,req.body.commentType,req.body.commentCategory);
		res.send({resp:'success',user:req.user.name});
	}
	else
		res.send({resp:'error',msg:'Authentication failure'});
});

module.exports=router;