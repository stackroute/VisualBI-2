//Credential collections keeps the information related to user like username, password and email address

var mongoose = require('mongoose'),
	 passportLocal = require('passport-local'),
	 passportLocalMongoose = require('passport-local-mongoose');

var CredentialSchema = mongoose.Schema({
   username: String,
   name: String,
	firstName: String,
	lastName: String,
	imagePath: String,
	email: String,
	time: {type: Date, default: Date.now}
}, {strict: false});

//CredentialSchema.plugin(passportLocal);
CredentialSchema.plugin(passportLocalMongoose);

//TODO: getCredentialsId is not required. Remove it 
CredentialSchema.statics.getCredentialId = function(username, callback){
  this.model('Credential')
		.findOne({
		'username': username
	}, {
		'_id': 1
	}).exec(function(err, data) {
			if(err){
				// console.log(err);
			}
			callback(data);
	});
};

//TODO: There must be error handling here. Use regular expression to get filterred users
CredentialSchema.statics.getUsers = function(callback){
	this.model('Credential')
			.find({},{'username':1,'name':1}).exec(function(err,data){
				if(!err)
					callback(data);
			})
}
// mongoose.model("Credential", CredentialSchema);
module.exports = CredentialSchema;
