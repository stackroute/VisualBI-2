var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
   name: String,
   emailId: String,
   pwd: String,
   preferences:[{
      theme:String,
      showLegend: Boolean
   }],
   dashboards: [{
      sharedWith: [mongoose.Schema.Types.Mixed],
      tabs: [{tabTitle: String,
         tabId: String,
         rows: [{
            rowId: String,
            colWidth: String,
            widgetId: String
         }]
      }]
   }]
}, {strict: false});

UserSchema.methods.getDashboard = function (emailId, callback) {
   this.model('User').find({
      'emailId': emailId
   })
   .select({
      'dashboards.tabs.tabTitle': 1,
      'dashboards.tabs.tabId': 1,
      '_id': 0
   })
   .exec(function(err, data){
      for(i in data){
         var ds = data[i].dashboards;
         for(i in ds){
            dashboards = ds[i].tabs;
            console.log(dashboards);
            callback(dashboards);
         }
      }
   });
}

module.exports = mongoose.model("User", UserSchema);
