//Model used to create a schema for widget collection of visualdb database

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
   this.model('Widget').find({}, function(err, data) {
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

WidgetSchema.statics.createWidget = function() {
  this.model('Widget').insert(function(err,data) {
    console.log("createWidget " + data);

  });
}

WidgetSchema.statics.saveWidget = function(userId, tabs, widgetList, User) {

  var widgetCount = widgetList.length;

  for(var i=0; i<widgetCount; i++) {
    this.model('Widget').update({
      '_id' : widgetList[i]._id
    },{
      $set:{
        studioId: widgetList[i].studioId,
        title: widgetList[i].title,
        chartRenderer: widgetList[i].chartRenderer,
        parameters: widgetList[i].parameters
      }
    },function(err) {
        if(err){
          console.log(err);
        }
    });
  }

  User.saveTab(userId, tabs);
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
// mongoose.model("Widget", WidgetSchema);
module.exports = WidgetSchema;
