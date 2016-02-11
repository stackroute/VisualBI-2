/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukherjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
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
   res.status(200).send("success");
});

router.post('/login', passport.authenticate('local'),function(req, res){
	//authenticated successfully, send the authentication token
	res.cookie("authToken", JSON.stringify({"authToken": req.user._id, "displayName": req.user.displayName}), { maxAge: 3600000 });
	res.status(200).send("success");
});

router.post('/register',function(req,res,next){
	if(!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName) {
		res.status(400).send('failed');
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
        console.log(err);
				res.status(500).send({ error: err });
			}
			else {
				res.status(200).send('success');
			}
		});
	}
});

module.exports = router;
