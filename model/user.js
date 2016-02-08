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

UserSchema.statics.isExist =function(currentUserName,currentDashboard,userId,permission,callback){
  // console.log("isExist userId "+userId+" "+currentUserName+" "+currentDashboard+" "+permission);
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

UserSchema.statics.updatePermission = function(currentUserId,currentUserName,currentDashboard,shareWithUserId,permission){
  // console.log("permission "+shareWithUserId+" "+currentUserId+" "+currentUserName+" "+currentDashboard);
  this.model('User').update({'_id':mongoose.Types.ObjectId(shareWithUserId),
                            "sharedDashboards.userid": currentUserId,
                            "sharedDashboards.username": currentUserName,
                            "sharedDashboards.dashboardid": currentDashboard
                            },
  {$set:{"sharedDashboards.$.permission": permission}}
  ,{upsert: true})
  .exec(function(err, data){
    // console.log(data);
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

UserSchema.statics.sharedDashboards = function(currentUserId,userName,currentDashboard){
    // console.log("dashboards.0.sharedWith "+currentUserId);
    this.model('User').update({userid:mongoose.Types.ObjectId(currentUserId),"dashboards._id":currentDashboard},
    {$addToSet:{"dashboards.$.sharedWith":
        {
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
