/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukherjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	* 7. Yogesh Goyal
 */
//Credential collections keeps the information related to user like username, password and email address

var mongoose = require('mongoose'),
	 passportLocal = require('passport-local'),
	 passportLocalMongoose = require('passport-local-mongoose');

var CredentialSchema = mongoose.Schema({
   username: String,
   displayName: String,
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
