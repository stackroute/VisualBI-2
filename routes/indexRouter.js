var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    User = require('../config/db').userModel,
    passport = require('passport'),
	 Credential = require('../config/db').credentialModel,
	 dbUtils = require('../model/dbUtils');

//TODO: need to make authetication for each route
// Login page
router.get('/',function(req, res, next) {
   res.render('index');
});

router.get('/logout', function(req, res, next) {
	res.clearCookie('authToken');
	req.logout();
  	req.session.destroy();
//	console.log("logged out successfully");
	//TODO: send the status
   res.send("success");
});

router.post('/login', passport.authenticate('local'),function(req, res){
	//authenticated successfully, send the authentication token
	res.cookie("authToken", JSON.stringify({"authToken": req.user._id, "name": req.user.name}), { maxAge: 3600000 });
	res.send("success");
});

router.post('/register',function(req,res,next){
	if(!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName) {
		res.send('failed');
	} else {
		dbUtils.registerUser({
			username: req.body.username,
			password: req.body.password,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			imagePath: req.body.imagePath,
			email: req.body.email

		}, function(err, user) {
			if(err){
				res.status(500).send({ error: err });
			}
			else {
				res.status(200).send('success');
			}
		});


//	  passport.authenticate('local')(req, res, function () {
//		 res.redirect('/');
//	  });
	}
});
 
module.exports = router;
