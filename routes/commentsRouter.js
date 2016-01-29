var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    Widget = require('../model/widget');

//router.post('/:userid/:widgetID/:comment',function(req,res,next){
//    console.log('Routing comment post!');
//    var userId = req.params.userid;
//    var widgetId=req.params.widgetID; 
//    var userComment=req.params.comment;
//    console.log('Calling Widget update function');
//    console.log(userId+' entered the comment : '+userComment);
//    Widget.postComment(userId,widgetId,userComment);
//    res.send({resp:'Database updated'});
//    
//});

/*router.post('/:id',function(req,res,next){
    console.log('Routing comment post!');
    var userId = '56a11a224de3516e7c42c26e';
    var widgetId = req.params.id;
    var userComment = req.body.userComment;
	
    console.log('Calling Widget update function');
    console.log(userId+' entered the comment : '+userComment);
    Widget.postComment(userId, widgetId, userComment);
    res.send({resp:'Database updated'});
    
});*/
router.post('/',function(req,res,next){
    console.log('Routing comment post!');
	console.log(req.body);
    

	
	console.log('Comment "'+req.body.comment+'" added to the widget.');
    
	Widget.postComment(req.body.userid, req.body.widgetid, req.body.comment);
    res.send({resp:'Database updated'});
});

module.exports=router;