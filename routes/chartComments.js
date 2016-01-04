var express = require('express');
var router = express.Router();
var util = require('./utils');
var path = require('path');

router.get('/:commentId', function(req, res, next) {
   var commentId = req.params.commentId;
   // comment id = 'gdpContinent';
   console.log("Requested commentId : " + commentId);
   var filePath = path.join(__dirname, '../public/data/comments/' + commentId + ".json");
   var commentData = util.readFile(filePath);
   res.send(commentData);
});

module.exports = router;
