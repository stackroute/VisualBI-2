var express = require('express'),
    router = express.Router(),
    User = require('../config/db').userModel,
    Credential = require('../config/db').credentialModel;
    utils = require('./utils');

router.get('/userData', function(req, res, next) {
    var userid = req.user._id; //it contains _id value of user whose dashboard to be fetched
    if (userid) {
        User.getData(userid, function(data) {
            res.json(data);
        });
    } else
        res.json({});
});

router.get('/getDashboard/:userid/:dashboardId', function(req, res, next) {
    var userid = req.params.userid; //it contains _id value of credentials
    var dashId = req.params.dashboardId;
    if (userid) {
        User.getDashboard(userid, dashId, function(data) {
            res.json(data);
        });
    } else
        res.json({});
});

router.post('/shareDashboard', function(req, res, next) {
    var userNames = req.body.userNames;
    var currentUserId = req.user._id;
    var currentUserName = req.user.username;
    var currentUserDisplayName = req.user.name;
    var permission = req.body.permission;
    var usernameProcessed = 0;
    var currentUserEmail = currentUserName;//have to change once email feild exists.

    userNames.forEach(function(userName){
      Credential.getCredentialId(userName).then(function(credentialObj){
        if(credentialObj !== null){
          credentialObj.displayName = credentialObj.name; //remove and assign from database.
          credentialObj.email = credentialObj.username;
          console.log("credObj",JSON.stringify(credentialObj));
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
              console.log("inserted into user document");
            }).catch(function(err){
              res.status(500).send("internal server error");
            });
          }
          return credentialObj;
        }).then(function(credentialObj){
          console.log("sharedDashboards ",currentUserId, credentialObj.displayName, credentialObj.username, credentialObj.username, credentialObj._id);
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
