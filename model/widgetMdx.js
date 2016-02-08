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

//function to fetch the widget documents from visualBI widget collection
widgetSchema.statics.getWidgets = function(callback) {
   this.model('Widget').find({}, function(err, data) {



     var dataLen = data.length;

     for(var i=dataLen-1; i>=0; i--) {
       var removeMe = false;

       if(typeof data[i].connectionData.catalog === 'undefined') {
         removeMe = true;
       } else if(typeof data[i].connectionData.dataSource === 'undefined') {
         removeMe = true;
       } else if(typeof data[i].connectionData.connectionId === 'undefined') {
         removeMe = true;
       } else if(typeof data[i].queryMDX === 'undefined') {
         removeMe = true;
       } else if(typeof data[i].widgetName === 'undefined') {
         removeMe = true;
       }

       if(removeMe) {
         data.splice(i, 1);
       }
     }
     callback(data);
   })
}

module.exports = widgetSchema;
