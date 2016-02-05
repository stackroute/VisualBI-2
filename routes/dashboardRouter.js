var express = require('express'),
    router = express.Router(),
    User = require('../model/user'),
	 utils = require('./utils');


router.get('/', function(req, res, next) {
	 var userid = req.user._id; //it contains _id value of user whose dashboard to be fetched
	 if(userid) {
		  User.getData(userid, function(data){
				res.json(data);
		  });
	 } else
		  res.json({});
});

router.get('/:userid/:dashboardId', function(req, res, next) {
	var userid = req.params.userid; //it contains _id value of credentials
	var dashId = req.params.dashboardId;
   if(userid) {
        User.getDashboard(userid, dashId, function(data){
            res.json(data);
        });
   } else
        res.json({});
});

module.exports = router;