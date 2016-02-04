var mongoose = require('mongoose');

  
var WidgetSchema = mongoose.Schema({
   title: String,
   chartRenderer: String,
   url: String,
   lastCommentedBy : String,
   commentsCounter :Number,
   comments:[{
	  _id : false,
      userid: String,//{ type: mongoose.Schema.ObjectId, ref: 'Credential' },
      comment: String,
      datetime:{type:Date, default: Date.Now},
	  badgeClass: String,
	  badgeIconClass: String
   }],
  commenters:[{commenter:String}],
  commentersCounter : Number
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

WidgetSchema.statics.getCommenters = function(widgetId,callback) {
   this.model('Widget').find({
	   '_id': widgetId
   }, {
      '_id': 0,
	   commenters: []
   },function(err, data) {
     callback(data);
   });
}


WidgetSchema.statics.updateCommenterDetails=function(widgetId,userid,callback){
	
   this.model('Widget').update({
     '_id' : widgetId
   },{$push:{
         commenters : {commenter:userid}
     }
   },function(err) {
       if(err){   
                console.log(err);
       }        
   });
	
   
   this.model('Widget').update({'_id' : widgetId},{$inc : { commentersCounter : 1 }},function(err) {
       if(err){  
                console.log(err);
       }
   });
}

WidgetSchema.statics.postComment=function(userid,widgetId,userComment,commentClass,commentCategory){
   this.model('Widget').update({
     '_id' : widgetId
   },{
     $push: {
         comments:{userid : userid,
                   comment : userComment,
                   datetime : new Date(),//{type:Date, default: Date.Now}, 
				   badgeClass : commentCategory,
				   badgeIconClass:commentClass,
				   _id:0
				  }
     }
   },function(err, userComment) {
       if(err){
                
                console.log(err);
       }
   });
	
   this.model('Widget').update({
     '_id' : widgetId
   },{$set:{
         lastCommentedBy : userid
     }
   },function(err, userComment) {
       if(err){   
                console.log(err);
       }        
   });
    
   
   this.model('Widget').update({'_id' : widgetId},{$inc : { commentsCounter : 1 }},function(err, userComment) {
       if(err){  
                console.log(err);
       }
   });

}
module.exports = mongoose.model("Widget", WidgetSchema);
