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
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
//User schema contains all widgets layout for a user

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	userid: { type: mongoose.Schema.ObjectId, ref: 'Credential' },
   preferences:[{
      _id: false,
      theme:String,
      showLegend: Boolean
   }],
   dashboards: [{
      _id: String,
      sharedWith: [mongoose.Schema.Types.Mixed],
      tabs: [{_id: false,
         tabTitle: String,
         tabId: String,
         rows: [{_id: false,
				 columns:[{_id: false,
				 colWidth: Number,
         widgetId: {type: mongoose.Schema.ObjectId, ref: 'Widget'}
				}]
         }]
      }]
   }],
	sharedDashboards:[]
}, {strict: false});

//Gets the dashboard of a user. It specically helps to fetch the shared dashboard
//TODO: should be sharedDashboard
UserSchema.statics.getDashboard = function (userid, callback) {
	this.model('User')
		.findOne({
		'userid': mongoose.Types.ObjectId(userid)
	}, {
		'_id': 0,
	}).populate('dashboards.tabs.rows.columns.widgetId')
		.exec(function(err, data) {
			var d={};
			if(!err && data && data.dashboards && data.dashboards.length > 0)
				d = data.dashboards[0];
			callback(d);
	});
}

//Gets the user's widgets layout
UserSchema.statics.getData = function (userid, callback) {
	this.model('User')
		.findOne({
		'userid': mongoose.Types.ObjectId(userid)
	}, {
		'_id': 0, //TODO: not required as it will not be inserted
	}).populate('dashboards.tabs.rows.columns.widgetId')
		.exec(function(err, data) {
			callback(data);
	});
}

UserSchema.statics.getDashboardsSharedWithMe = function (userid, callback) {
	return this.model('User')
		.findOne({
		'userid': mongoose.Types.ObjectId(userid)
	}, {
		_id: 0,
		'sharedDashboards': 1
	}).populate('dashboards.tabs.rows.columns.widgetId')
		.exec(callback);
}

//TODO: TO be deleted
UserSchema.statics.setUserTheme=function(id, userTheme){
   this.model('User').update({
     'email' : id
   },{
     $set: {
       preferences:{
         theme:userTheme
       }
     }
   },function(err, userTheme) {
   });
}

//TODO: can be done at client side because it has all the data there. check and remove the method
UserSchema.statics.isExist =function(currentUserEmail, currentUserName, userId, permission){
	return  this.model('User')
    .findOne({
      "userid": userId,
      "sharedDashboards.username": currentUserName
    }).exec(function(data) {
	});
}

UserSchema.statics.shareDashboard = function(currentUserEmail, currentUserId, currentusername, shareWithUserId, currentUserDisplayName, permission){
	return this.model('User').update({'userid':shareWithUserId},
  {$addToSet:{"sharedDashboards":
      { "userid" : currentUserId,
				"email" : currentUserEmail,
        "username" : currentusername,
				"displayname": currentUserDisplayName,
        "permission": permission
      },
    }
  },{upsert: true}).exec();
}

//TODO: indentation needs to be corrected
UserSchema.statics.updatePermission = function(currentUserEmail, currentUserId, currentUserName, shareWithUserId, currentUserDisplayName, permission){
	return this.model('User').update({'userid':mongoose.Types.ObjectId(shareWithUserId),
                            "sharedDashboards.userid": currentUserId,
                            "sharedDashboards.username": currentUserName,
														"sharedDashboards.email": currentUserEmail,
														"sharedDashboards.displayname": currentUserDisplayName
                            },
  {$set:{"sharedDashboards.$.permission": permission}}
  ,{upsert: true})
  .exec(function(err, data){
  });
}

UserSchema.statics.saveTab = function(userid, savetabs) {

  this.model('User').update({
    'userid': userid
  },{
    $set: {
      dashboards:[{
        tabs:savetabs
      }]
    }
  },function(err, data) {

  });
}

UserSchema.statics.sharedDashboards = function(currentUserId, displayName, userName, email, userId){ //email should b passed
    return this.model('User').update({userid:mongoose.Types.ObjectId(currentUserId)},
    {$addToSet:{"dashboards.0.sharedWith":
        {
					"displayname": displayName,
          "username" : userName,
					"email" : email,
					"userid": userId
        }
      }
    },{upsert: true}).exec();
}

//TODO: revisit the logic and remove the unnecessary stuff
UserSchema.statics.getUserId =function(credentialId){
  return this.model('User')
    .findOne({
      userid:mongoose.Types.ObjectId(credentialId)
    },
    {
      _id:1
    }).exec(function(err, data) {
        // callback(data);
    	});
}
// mongoose.model("User", UserSchema);
module.exports = UserSchema;
