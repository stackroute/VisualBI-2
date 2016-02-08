//Credential collections keeps the information related to user like username, password and email address

var mongoose = require('mongoose'),
	 passportLocal = require('passport-local'),
	 passportLocalMongoose = require('passport-local-mongoose');
   mongoose = require('mongoose');
	 // set Promise provider to bluebird
	 mongoose.Promise = require('bluebird');

var CredentialSchema = mongoose.Schema({
   username: String,
   name: String,
	firstName: String,
	lastName: String,
	imagePath: String,
	time: {type: Date, default: Date.now}
}, {strict: false});

//CredentialSchema.plugin(passportLocal);
CredentialSchema.plugin(passportLocalMongoose);

CredentialSchema.statics.getCredentialId = function(username, callback){
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

CredentialSchema.statics.getUsers = function(callback){
	this.model('Credential')
			.find({},{'username':1}).exec(function(err,data){
				if(!err)
					callback(data);
			})
}
// mongoose.model("Credential", CredentialSchema);
module.exports = CredentialSchema;
