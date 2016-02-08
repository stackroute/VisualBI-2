var express = require('express'),
    router = express.Router(),
    User = require('../config/db').userModel,
    Credential = require('../config/db').credentialModel;

router.post('/shareDashboard',function(req, res, next){
  var currentDashboard = req.body.currentDashboard;
  var userNames = req.body.userNames;
  var currentUserId = req.user._id;
  var currentUserName = req.user.username;
  var permission = req.body.permission;
  var usernameProcessed = 0;

  userNames.forEach(function(credentialObj){
    User.getUserId(credentialObj._id,function(userObj){
      if(userObj === null)
        {
          res.send(credentialObj.username+"'s document not present");
      }
      else{
        User.isExist(currentUserName,currentDashboard,userObj._id,permission,function(result){
          if(result == true )
          {User.updatePermission(currentUserId,currentUserName,currentDashboard,userObj._id,permission);
            console.log("updating permission");}
          else {
            console.log("not updating");
            User.shareDashboard(currentUserId,currentUserName,currentDashboard,userObj._id,permission,function(result){
              User.sharedDashboards(currentUserId,credentialObj.username,currentDashboard);
            });
          }
        });


        usernameProcessed++;
        if(userNames.length==usernameProcessed)
          res.send(true);
      }
    });
  });
});

router.post('/', function(req, res, next) {
    var userName = req.body.userName;
    var currentDashboard = req.body.currentDashboard;
    var currentUserName = req.user.username;
    var permission = req.body.permission;
    if(userName) {
      Credential.getCredentialId(userName, function(credentialId){
        if(!credentialId){
          res.send("Invalid user");
        }
        else{
          User.getUserId(credentialId._id,function(userId){
            if(userId === null)
              {
                res.send(userName+"'s document not present");
            } else {
            User.isExist(currentUserName,currentDashboard,userId._id,permission,function(result){
              if(result == true )
                res.send("user already existing");
              else {
                res.send("can be shared");
              }
            });
            }
          });
        }
      });
    }
});

module.exports = router;
