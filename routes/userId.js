var express = require('express'),
    router = express.Router(),
    User = require('../model/user'),
    Credential = require('../model/credential');

    var currentUserId = "56a601d8a375b2ea99a9b121"; // req.user._id || instead of objectId
    var currentUserName = "ashok.kumar@wipro.com";

router.post('/shareDashboard',function(req, res, next){
  var currentDashboard = req.body.currentDashboard;
  var userNames = req.body.userNames;

  var usernameProcessed = 0

  userNames.forEach(function(credentialObj){
    User.getUserId(credentialObj._id,function(userObj){
      if(userObj === null)
        {
          res.send(credentialObj.username+"'s document not present");
      }else{
        console.log(userObj._id);
        User.shareDashboard(currentUserName,currentDashboard,userObj._id,function(result){
          console.log("result "+result);
        });
        usernameProcessed++;
        if(userNames.length==usernameProcessed)
          res.send("inserted");
      }

    });
  });
});
router.post('/', function(req, res, next) {
    var userName = req.body.userName;
    var currentDashboard = req.body.currentDashboard;

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
            User.isExist(currentUserName,currentDashboard,userId._id,function(result){
              if(result == true )
                res.send("user already existing");
              else {
                res.send("could share");
              }
            });
            }
          });
        }
      });
    }
});

module.exports = router;
