var express = require('express'),
    router = express.Router(),
    User = require('../model/user'),
	 utils = require('./utils');


router.get('/:id', function(req, res, next) {
	
	console.log(req.user);
    var userid = req.params.id; //it contains _id value of credentials
	
    if(userid) {
        User.getDashboard(userid, function(data){
            res.json(data);
        });
    } else
        res.json({});
});

module.exports = router;