var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    Widget = require('../model/widget');

router.post('/',function(req,res,next){
	
	console.log("User authenticated: ", req.isAuthenticated());
	console.log("Current User : ", req.user);
    
	Widget.postComment(req.body.userid, req.body.widgetid, req.body.comment,req.body.commentType,req.body.commentCategory);
	
    res.send({resp:'Database updated'});
});

module.exports=router;