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
      sharedWith: [String],
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

module.exports = mongoose.model("users", UserSchema);
