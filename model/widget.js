/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
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
