var express = require('express'),
    router = express.Router(),
    User = require('../model/user');


router.get('/dashboard', function(req, res, next) {
    var email = req.email;
    if(email) {
        User.getDashboard(email, function(data){
            res.json(data);
        });
    } else
        res.json({});
});

router.get('/:id', function(req, res, next) {
    var email = req.params.id;
    if(email) {
        User.getUser(email, function(user){
            res.json(user);
        });
    } else
        res.json({});
});

router.post('/savetab', function(req, res, next) {
  User.saveTab(req.user._id, req.body.tabs);
  res.send({resp:"Tabs updated successfully"});
});

module.exports = router;
