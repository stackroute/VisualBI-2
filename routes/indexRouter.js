var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    User = require('../model/user'),
    passport = require('passport'),
	 Credential = require('../model/credential');

// Login page
router.get('/',function(req, res, next) {
   res.render('index');
});

router.get('/logout', function(req, res, next) {
	res.clearCookie('authToken');
	req.logout();
  	req.session.destroy();
	console.log("logged out successfully");
   res.send("success");
});

router.post('/login', passport.authenticate('local'),function(req, res){
	//authenticated successfully, send the authentication token
	res.cookie("authToken", JSON.stringify({"authToken": req.user._id, "name": req.user.name}), { expires: new Date(Date.now() + 900000)});
	res.send("success");
});




router.post('/register',function(req,res,next){
	
	console.log("Username: ", req.body.username);
	console.log("Current User : ", req.body.password);
    
	Credential.registerUser(req.body.username, req.body.password);
	
    res.send({resp:'Registration Done'});
});


//function registerUser (req, res, next) {
//	Credential.register({ username : "wave1@wipro.com", name: "Wave 1"}, "abc@123", function(err, account) {
//		console.log("added");
//		next();
//	});

//        passport.authenticate('local')(req, res, function () {
//          res.redirect('/');
//        });
	
//}
module.exports = router;
