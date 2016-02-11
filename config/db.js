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
    * 4. Venkatakrishnan
    * 5. Arun Karthic
    * 6. Hari Prasad Timmapathini
	* 7. Yogesh Goyal
 */
var mongoose = require('mongoose');
//connecting multiple database
var visualdb = mongoose.connect("mongodb://localhost:27017/visualdb");
var studiodb = mongoose.createConnection("mongodb://localhost:27017/visualBI"); //172.23.238.253

var connectionSchema = require('../model/connections');
var credentialSchema = require('../model/credential');
var userSchema = require('../model/user');
var widgetSchema = require('../model/widget');
var widgetMdxSchema = require('../model/widgetMdx')

module.exports = {
  credentialModel : mongoose.model('Credential',credentialSchema),
  userModel : mongoose.model('User',userSchema),
  widgetModel : mongoose.model('Widget', widgetSchema),
	widgetMdxModel : studiodb.model('Widget', widgetMdxSchema),
  connectionModel : studiodb.model('Connection',connectionSchema)
};

 // module.exports = {
 //   url: "mongodb://localhost:27017/visualdb"
 // };
