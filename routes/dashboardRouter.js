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
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
var express = require('express'),
    router = express.Router(),
    User = require('../config/db').userModel,
    Credential = require('../config/db').credentialModel;
    utils = require('./utils');

//Checks wheather user is authenticated
router.use(utils.isAuthenticated);
router.get('/userData', function(req, res, next) {
    var userid = req.user._id; //it contains _id value of user whose dashboard to be fetched
    if (userid) {
        User.getData(userid, function(data) {
            res.json(data);
        });
    } else
        res.json({});
});

router.get('/getDashboard/:userid', function(req, res, next) {
    var userid = req.params.userid; //it contains _id value of credentials
    if (userid) {
        User.getDashboard(userid, function(data) {
            res.json(data);
        });
    } else
        res.json({});
});

router.post('/shareDashboard', function(req, res, next) {
    var userNames = req.body.userNames;
    var currentUserId = req.user._id;
    var currentUserName = req.user.username;
    var currentUserDisplayName = req.user.displayName;
    var permission = req.body.permission;
    var usernameProcessed = 0;
    var currentUserEmail = req.user.email;//have to change once email feild exists.

    userNames.forEach(function(userName){
      Credential.getCredentialId(userName).then(function(credentialObj){
        if(credentialObj !== null){
          return credentialObj;
        }else{
          res.status(400).send("Not a valid user.");
        }
      }).then(function(credentialObj){
          User.isExist(currentUserEmail, currentUserName, credentialObj._id, permission).then(function(isExist){
          return {isExist:isExist,credentialObj:credentialObj};
        }).then(function(result){
            if(result.isExist !== null){
              User.updatePermission(currentUserEmail, currentUserId, currentUserName, result.credentialObj._id, currentUserDisplayName, permission).then(function(data){
              }).catch(function(err){
                res.status(500).send("internal server error");
              });
            }else{
              User.shareDashboard(currentUserEmail, currentUserId, currentUserName, result.credentialObj._id, currentUserDisplayName, permission).then(function(){
              }).catch(function(err){
                res.status(500).send("internal server error");
              });
            }
            return credentialObj;
        }).then(function(credentialObj){
          // console.log("sharedDashboards ",currentUserId, credentialObj.displayName, credentialObj.username, credentialObj.username, credentialObj._id);
          User.sharedDashboards(currentUserId, credentialObj.displayName, credentialObj.username, credentialObj.email, credentialObj._id);
          usernameProcessed++;
          if (userNames.length == usernameProcessed)
           res.status(200).send(true);
        })
      }).catch(function(err){
        res.status(500).send("internal server error");
      })
    })
});

router.get('/userList/:query?', function(req, res) {
  var  query =req.params.query;

    Credential.getUsers(query,function(data) {
        res.status(200).json(data);
    });
});

module.exports = router;
