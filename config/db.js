var mongoose = require('mongoose');
//connecting multiple database
var visualdb = mongoose.connect("mongodb://localhost:27017/visualdb");
var studiodb = mongoose.createConnection("mongodb://172.23.238.253:27017/visualBI"); //172.23.238.253

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
