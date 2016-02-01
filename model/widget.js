var mongoose = require('mongoose');
  
var WidgetSchema = mongoose.Schema({
   title: String,
   chartRenderer: String,
   url: String,
   comments:[{
	  _id : false,
      userid: String,//{ type: mongoose.Schema.ObjectId, ref: 'Credential' },
      comment: String,
      datetime: String,//{type:Date, default: Date.Now}
	  badgeClass: String,
	  badgeIconClass: String
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

WidgetSchema.statics.postComment=function(userid,widgetId,userComment,commentClass,commentCategory){
    
    //console.log('At db insert functionality'); expectedchanges

    console.log(userid+' '+widgetId+' '+userComment);
    
   this.model('Widget').update({
     '_id' : widgetId
   },{
     $push: {
         comments:{userid : userid,
                   comment : userComment,
                   datetime : '5th Jan 2016', //expectedchanges
				   badgeClass : commentCategory,
				   badgeIconClass:commentClass,
				   _id:0
				  }
     }
   },function(err, userComment) {
       if(err){
                console.log('Upsert failure');//expectedchanges
                console.log(err);
       }
       else
                console.log('Comment posted to Mongo.');

   });
	
   this.model('Widget').update({
     '_id' : widgetId
   },{
     $set:{
         lastaddedby : userid,
		 countComments : 77 //expectedchanges
     }
   },function(err, userComment) {
       if(err){
                console.log('Comment meta update failure');
                console.log(err);
       }
       else
                console.log('Comment meta added for widget updated successfully!')
   });
}
module.exports = mongoose.model("Widget", WidgetSchema);
