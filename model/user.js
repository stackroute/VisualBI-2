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

UserSchema.statics.addUser = function(userid, dashboardId, done) {


}

//Gets the dashboard of a user. It specically helps to fetch the shared dashboard
UserSchema.statics.getDashboard = function (userid, dashboardId, callback) {
	console.log("getDashboard ",userid);
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
				console.log(d);
			callback(d);
	});
}

//Gets the user's widgets layout
UserSchema.statics.getData = function (userid, callback) {
	this.model('User')
		.findOne({
		'userid': mongoose.Types.ObjectId(userid)
	}, {
		'_id': 0,
	}).populate('dashboards.tabs.rows.columns.widgetId')
		.exec(function(err, data) {
			callback(data);
	});
}

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

UserSchema.statics.isExist =function(currentUserEmail, currentUserName, userId, permission){
  console.log("isExist userId "+mongoose.Types.ObjectId(userId)+" "+currentUserName);
	return  this.model('User')
    .findOne({
      "userid": mongoose.Types.ObjectId("56a20467ba51e8e81f1a35a4"),
      "sharedDashboards.username": currentUserName
    }).exec(function(data) {
	});
}

UserSchema.statics.shareDashboard = function(currentUserEmail, currentUserId, currentusername, shareWithUserId, currentUserDisplayName, permission){
	console.log("inserting"+currentUserEmail, currentUserId, currentusername, shareWithUserId, permission);
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

UserSchema.statics.updatePermission = function(currentUserEmail, currentUserId, currentUserName, shareWithUserId, currentUserDisplayName, permission){
  return this.model('User').update({'userid':shareWithUserId,
                            "sharedDashboards.userid": currentUserId,
                            "sharedDashboards.username": currentUserName,
														"sharedDashboards.email": currentUserEmail,
														"sharedDashboards.displayname": currentUserDisplayName
                            },
  {$set:{"sharedDashboards.permission": permission}}
  ,{upsert: true})
  .exec(function(err, data){
    console.log(data);
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
    console.log("dashboards.0.sharedWith "+currentUserId);
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
