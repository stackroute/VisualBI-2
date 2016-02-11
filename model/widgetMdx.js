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
    * 2. Partha Mukherjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
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
