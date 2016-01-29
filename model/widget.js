var mongoose = require('mongoose');
  
var WidgetSchema = mongoose.Schema({
   title: String,
   chartRenderer: String,
   widgetId: String,
   url: String,
   comments:[{
      userId:String,
      comment: String,
      datetime: String//{type:Date, default: Date.Now}
   }]
}, {strict: false});

WidgetSchema.statics.getWidgets = function(callback) {
   this.model('Widget').find({}, {
      "_id":0
   }, function(err, data) {
      callback(data);
   })
}

WidgetSchema.statics.getWidget = function (widgetId, callback) {
   this.model('Widget').findOne({
      'widgetId': widgetId
   }, {
      '_id': 0
   },function(err, data) {
      callback(data);
   });
}

WidgetSchema.statics.postComment=function(userid,widgetId,userComment){
    
    console.log('At db insert functionality');

    console.log(userid+' '+widgetId+' '+userComment);
    
   this.model('Widget').update({
     '_id' : widgetId
   },{
     $push: {
         comments:{userid : userid,
                    comment : userComment,
                   datetime : '5th Jan 2016'}
     }
   },function(err, userComment) {
       if(err){
                console.log('Upsert failure');
                console.log(err);
       }
       else
                console.log('Comment posted to Mongo successfully!')

   });
}
module.exports = mongoose.model("Widget", WidgetSchema);
