var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    Widget = require('../model/widget');

router.post('/',function(req,res,next){
    console.log('Routing comment post!');
	console.log(req.body);
    
    console.log('Comment "'+req.body.comment+'" added to the widget.');
    
	Widget.postComment(req.body.userid, req.body.widgetid, req.body.comment);
    res.send({resp:'Database updated'});
});

module.exports=router;