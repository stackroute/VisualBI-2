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
//This files contains method which interact with database. All logic should be written here so that
//unit test cases can be written for all db interaction

//TODO: not required, can be put in route only

var mongoose = require('mongoose'),
	 User = require('../config/db').userModel,
	 Credential = require('../config/db').credentialModel,
	 Widget = require('../config/db').widgetModel;

//Registers a user. It creates an entry into Credential collection. It also adds one template
//in User collection for dashboard
this.registerUser = function (user, done) {
	Credential.register({
		username : user.username,
		displayName: user.firstName + ' ' + user.lastName,
		imagePath: user.imagePath,
		email: user.email
	}, user.password, function(err, account) {
		if(err) {
			done(err, 'failed')
		} else {
			//make an entry in user collection for new user
			var newUser = new User({
				userid: account._id,
				preferences: [ { theme: 'normal', showLegent: true}],
				dashboards: [{
					_id: mongoose.Types.ObjectId(),
					displayName: "myDashboard",
					sharedWith: [],
					tabs: []
				}],
				sharedDashboards: []
			});
			newUser.save(function(err) {
				if(err) done(err, 'failed');
				else done(null, account);
			});
		}
	});
}

module.exports = this;
