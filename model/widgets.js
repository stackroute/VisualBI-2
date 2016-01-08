var mongoose = require('mongoose');

var WidgetSchema = mongoose.Schema({
   title: String,
   chartRenderer: String,
   widgetId: String,
   url: String,
   comments:[{
      userId:String,
      comment: String,
      datetime: {type:Date, default: Date.Now}
   }]
}, {strict: false});

module.exports = mongoose.model("widgets", WidgetSchema);
