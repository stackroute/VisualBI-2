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
	sharedDashboards:[{
		userid: String, //{ type: mongoose.Schema.ObjectId, ref: 'Credential' },
		username: String,
		dashboardid: String,
		permission: String
	}]
}, {strict: false});

//Gets the dashboard of a user. It specically helps to fetch the shared dashboard
//TODO: should be sharedDashboard
UserSchema.statics.getDashboard = function (userid, dashboardId, callback) {
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
UserSchema.statics.isExist =function(currentUserName,currentDashboard,userId,permission,callback){
  this.model('User')
    .findOne({
      _id:mongoose.Types.ObjectId(userId),
      "sharedDashboards.username": currentUserName,
      "sharedDashboards.dashboardid": currentDashboard
    }).exec(function(err, data) {
      callback(data !== null )
	});
}

UserSchema.statics.shareDashboard = function(currentUserId,currentusername,currentDashboard,shareWithUserId,permission,callback){
  this.model('User').update({'_id':mongoose.Types.ObjectId(shareWithUserId)},
  {$addToSet:{"sharedDashboards":
      { "userid" : currentUserId,
        "username" : currentusername,
        "dashboardid": currentDashboard,
        "permission": permission
      },
    }
  },{upsert: true},
  function(err,data){
    callback(data !== null )
  });
}

//TODO: indentation needs to be corrected
UserSchema.statics.updatePermission = function(currentUserId,currentUserName,currentDashboard,shareWithUserId,permission){
  this.model('User').update({'_id':mongoose.Types.ObjectId(shareWithUserId),
                            "sharedDashboards.userid": currentUserId,
                            "sharedDashboards.username": currentUserName,
                            "sharedDashboards.dashboardid": currentDashboard
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

UserSchema.statics.sharedDashboards = function(currentUserId,userName,user,currentDashboard){
    this.model('User').update({userid:mongoose.Types.ObjectId(currentUserId),"dashboards._id":currentDashboard},
    {$addToSet:{"dashboards.$.sharedWith":
        {
					"user": user,
          "username" : userName
        },
      }
    },{upsert: true},
    function(err, data) {
        if(err)
          return err;
        return true;
  	});
}

//TODO: revisit the logic and remove the unnecessary stuff
UserSchema.statics.getUserId =function(credentialId,callback){
  this.model('User')
    .findOne({
      userid:mongoose.Types.ObjectId(credentialId)
    },
    {
      _id:1
    }).exec(function(err, data) {
        callback(data);
    	});
}
// mongoose.model("User", UserSchema);
module.exports = UserSchema;
