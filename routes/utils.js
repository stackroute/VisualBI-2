var fs = require('fs');
var path = require('path');

this.readFile = function(path) {
	var data = fs.readFileSync(path);
      return data.toString();
   };

this.isAuthenticated = function isAuthenticated(req,res,next){
	 if(req.isAuthenticated()) return next();
	 res.status(401).send('Not authorised');
};

module.exports = this;
