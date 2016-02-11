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
var express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    multer = require('multer');

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());
//TODO: keep multer related stuff separate file
//TODO: create a separate folder for user profile images
//TODO: error handling should be standerd - put res.status
var storage = multer.diskStorage({ 
	//multers disk storage settings
   destination: function (req, file, cb) {
   	cb(null, 'public/images/displayimages/')
   },
	filename: function (req, file, cb) {
			var datetimestamp = Date.now();
			cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
		}
});

 var upload = multer({//multer settings
    storage: storage }).single('file');

router.post('/', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null,destination:req.file.destination,file:req.file.filename});
        });
    });


module.exports=router;
