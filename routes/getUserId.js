var express = require('express'),
    router = express.Router(),
    user = require('../config/db').userModel,
    credential = require('../config/db').credentialModel;


router.get('/:username', function(req, res, next) {
    var username = req.params.username; //it contains username value of dashboard to be shared with.
    //console.log(username);
    //console.log(req.user._id);
    if(username) {
        credential.getUserId(username, function(touserId){
          console.log(touserId);
          // req.user._id || instead of objectId
          user.insertSharedWith("56a601d8a375b2ea99a9b121",touserId);
        });
    }
});

module.exports = router;
