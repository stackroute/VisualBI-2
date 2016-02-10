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
	  badgeClass: String,
	  badgeIconClass: String,
	  displayName: String,
	  userImage: String,
     datetime:{type:Date, default: Date.Now},
   }],
  commenters:[String],
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
  console.log("saveWidget");
  console.log(userId);
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
        status: 'blank',
        __v: 0
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

WidgetSchema.statics.saveComment = function(widgetId, comment, done) {
	return this.model('Widget').update({ '_id' : widgetId }, {
		$set: { lastCommentedBy : comment.displayName }, 
		$inc : { commentsCounter : 1 },
		$addToSet : { commenters: comment.userid },
		$push: { comments: comment }
	}).exec(done);
};

//WidgetSchema.statics.updateCommenter = function(widgetId, commenterId, done) {};

// mongoose.model("Widget", WidgetSchema);
module.exports = WidgetSchema;
