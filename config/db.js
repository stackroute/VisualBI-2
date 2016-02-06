var mongoose = require('mongoose');
var visualdb = mongoose.connect("mongodb://localhost:27017/visualdb");
var studiodb = mongoose.createConnection("mongodb://172.23.238.253/visualBI");

var connectionSchema = require('../model/connections');
var credentialSchema = require('../model/credential');
//var dbUtilsSchema = require('./model/dbUtils');
var userSchema = require('../model/user');
var widgetSchema = require('../model/widget');
var widgetWave1Schema = require('../model/widget_wave1')

module.exports = {
  connectionModel : mongoose.model('Connection',connectionSchema),
  credentialModel : mongoose.model('Credential',credentialSchema),
//  dbUtilsModel : mongoose.model('Config',dbUtilsSchema),
  userModel : mongoose.model('User',userSchema),
  widgetModel : mongoose.model('Widget', widgetSchema),
	widgetWave1Model : studiodb.model('Widget', widgetWave1Schema)

};


// module.exports = {
// //    url : 'mongodb://172.23.238.253:27017/visualdb',
// 	 url : 'mongodb://localhost:27017/visualdb'
// }
