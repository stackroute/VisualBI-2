var express = require('express'),
    router = express.Router(),
    User = require('../model/user'),
    Credential = require('../model/credential');

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
      }else{
        User.shareDashboard(currentUserId,currentUserName,currentDashboard,userObj._id,permission,function(result){
          User.sharedDashboards(currentUserId,credentialObj.username,currentDashboard);
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
    var currentUserName = req.user.name;
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
                res.send(true);
              }
            });
            }
          });
        }
      });
    }
});

module.exports = router;
