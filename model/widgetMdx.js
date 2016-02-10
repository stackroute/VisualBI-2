//Model used to create a schema for widget collection of visualBI database

var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var widgetSchema = new schema({
  widgetName      : String,
  createdBy       : String,
  createdOn       : Date,
  modifiedOn      :  Date,
  queryMDX        : String,
  description     : String,
  connectionData  : {
                       connectionId : {type: schema.Types.ObjectId},
                       dataSource: String,
                       catalog: String,
                       cube: String
                    },
   widgetSlug      : String
});

var widgetProto = function(studioid, title, chartRenderer, parameters) {
  this._id = '';
  this.studioId = studioid;
  this.title = title;
  this.chartRenderer = chartRenderer;
  this.parameters = parameters;
}

//function to fetch the widget documents from visualBI widget collection
widgetSchema.statics.getWidgets = function(callback) {
   this.model('Widget').find({}, function(err, data) {

     var dataLen = data.length;

     for(var i=dataLen-1; i>=0; i--) {
       var removeData = false;

       if(typeof data[i].connectionData.catalog === 'undefined') {
         removeData = true;
       } else if(typeof data[i].connectionData.dataSource === 'undefined') {
         removeData = true;
       } else if(typeof data[i].connectionData.connectionId === 'undefined') {
         removeData = true;
       } else if(typeof data[i].queryMDX === 'undefined') {
         removeData = true;
       } else if(typeof data[i].widgetName === 'undefined') {
         removeData = true;
       }

       if(removeData) {
         data.splice(i, 1);
       } else {

         var title = data[i].widgetName;
         var studioId = data[i]._id;
         var chartRenderer = "executeQueryService";
         var params = {
           "showGraphIcon" : true,
           "catalog" : data[i].connectionData.catalog,
           "dataSource" : data[i].connectionData.dataSource,
           "connId" : data[i].connectionData.connectionId,
           "statement" : data[i].queryMDX
         };

         data[i] = new widgetProto(studioId, title, chartRenderer, params);
       }
     }
     callback(data);
   })
}

module.exports = widgetSchema;
