var mongoose = require('mongoose'),
	 passportLocal = require('passport-local'),
	 passportLocalMongoose = require('passport-local-mongoose');

var CredentialSchema = mongoose.Schema({
   username: String,
   name: String,
	time: {type: Date, default: Date.now}
}, {strict: false});

//CredentialSchema.plugin(passportLocal);
CredentialSchema.plugin(passportLocalMongoose);

CredentialSchema.statics.registerUser =function(username,password) {
    this.model('Credential').update({},{$push:{userinfo:{
         username : username,
         password : password
    }
     }
     },
   function(err, data) {
       if(err){
                
                console.log(err);
       }
        console.log("Registration updated in db");
   });
};

CredentialSchema.statics.getUserId = function(username, callback){
  this.model('Credential')
		.findOne({
		'username': username
	}, {
		'_id': 1
	}).exec(function(err, data) {
			if(err){
				console.log(err);
			}
			callback(data);
	});
};

module.exports = mongoose.model("Credential", CredentialSchema);
