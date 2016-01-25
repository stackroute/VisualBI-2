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

module.exports = router;