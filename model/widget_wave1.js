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

widgetSchema.statics.getWidgets = function(callback) {
   this.model('Widget').find({}, function(err, data) {
      callback(data);
   })
}

//var widget = mongoose.model('Widget', widgetSchema);
module.exports = widgetSchema;
