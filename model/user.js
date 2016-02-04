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
      tabs: [{tabTitle: String,
         tabId: String,
         rows: [{
				columns:[{
					colWidth: Number,
            	widgetId: {type: mongoose.Schema.ObjectId, ref: 'Widget'}
				}]
         }]
      }]
   }]
}, {strict: false});

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

UserSchema.statics.isExist =function(currentUserName,currentDashboard,userId,callback){
  this.model('User')
    .findOne({
      _id:mongoose.Types.ObjectId(userId),
      "sharedDashboards.username": currentUserName,
      "sharedDashboards.dashboardId": currentDashboard
    }).exec(function(err, data) {
      callback(data !== null )
	});
}

UserSchema.statics.shareDashboard = function(currentUserId,currentusername,currentDashboard,shareWithUserId,permission,callback){
  console.log(currentusername);
  console.log(currentDashboard);
  console.log("userId"+mongoose.Types.ObjectId(shareWithUserId));
  this.model('User').update({'_id':mongoose.Types.ObjectId(shareWithUserId)},
  {$addToSet:{"sharedDashboards":
      { "userid" : currentUserId,
        "username" : currentusername,
        "dashboardId": currentDashboard,
        "permission": permission
      }
    }
  },
  function(err,data){
        if(err){
                return false;
        }else{
          console.log(data);
          callback(true);
        }
  });
}

UserSchema.statics.sharedDashboards = function(currentSessionUserId,currentDashboard,userId){
  this.model('User')
    .findOne({
      _id:mongoose.Types.ObjectId(currentSessionUserId),
      "dashboards._id": currentDashboard
    }).exec(function(err, data) {
      if(err)
        return err;
      return data;
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
      if(err)
        return err;
      callback(data);
	});
}
module.exports = mongoose.model("User", UserSchema);
