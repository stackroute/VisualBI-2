//Model used to create a schema for widget collection of visualdb database

var mongoose = require('mongoose');
//TODO: In commentters, there should be array of mongo userid. Also make
var WidgetSchema = mongoose.Schema({
   title: String,
   chartRenderer: String,
   parameters: Object,
   lastCommentedBy : String,
   commentsCounter :Number,
	studioId: String,
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

//TODO: not required here. check at client end and send the correct schema to server
WidgetSchema.statics.getWidgets = function(callback) {
   this.model('Widget').find({}, function(err, data) {
      callback(data);
   })
}

//WidgetSchema.statics.getWidget = function (widgetId, callback) {
//   this.model('Widget').findOne({
//      'widgetId': widgetId
//   }, {
//      '_id': 0
//   },function(err, data) {
//      callback(data);
//   });
//}

WidgetSchema.statics.getComments = function (widgetId, callback) {
   return this.model('Widget').findOne({
		 "_id" : mongoose.Types.ObjectId(widgetId)
	}).exec(callback);
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

createNewWidgetId = function(callback) {

  var widget = mongoose.model('Widget', WidgetSchema);

  var emptyWidget = new widget({
      status: 'blank'
    });

  emptyWidget.save(function(err, res) {
    if (err) return console.error(err);
    callback(res._id);
  });
}

WidgetSchema.statics.getNewWidgetId = function(callback) {
  this.model('Widget').findOne({
       'status': 'blank'
    },function(err, data) {
      if(data == null) {
        console.log("creating new widget id");
        createNewWidgetId(function(id) {
          callback(id);
        });
      } else {
        callback(data._id);
      }
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
      },
      $unset:{
        status: 'blank'
      }
    },function(err) {
        if(err){
          console.log(err);
        }
    });
  }

  User.saveTab(userId, tabs);
}

WidgetSchema.statics.renameTitle = function(widgetId, newTitle) {

  this.model('Widget').update({
    '_id' : widgetId
  },{
    $set:{
      title: newTitle
    }
  },function(err) {
      if(err){
        console.log(err);
      }
  });
}

//TODO: there should be only one postcomment method which will update complete comment details
WidgetSchema.statics.updateCommenterDetails=function(widgetId,userid,callback){

   this.model('Widget').update({
     '_id' : widgetId
   },{$push:{
         commenters : {commenter:userid}
     }
   },function(err) {
       if(err){
//                console.log(err);
       }
   });


   this.model('Widget').update({'_id' : widgetId},{$inc : { commentersCounter : 1 }},function(err) {
       if(err){
//                console.log(err);
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

//                console.log(err);
       }
   });

   this.model('Widget').update({
     '_id' : widgetId
   },{$set:{
         lastCommentedBy : userid
     }
   },function(err, userComment) {
       if(err){
//                console.log(err);
       }
   });


   this.model('Widget').update({'_id' : widgetId},{$inc : { commentsCounter : 1 }},function(err, userComment) {
       if(err){
//                console.log(err);
       }
   });

}
// mongoose.model("Widget", WidgetSchema);
module.exports = WidgetSchema;
