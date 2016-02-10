var express = require('express'),
    router = express.Router(),
    util = require('./utils'),
    path = require('path'),
    multer = require('multer');

//TODO: keep multer related stuff separate file
//TODO: create a separate folder for user profile images
//TODO: error handling should be standerd - put res.status
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, 'public/images/displayimages/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

 var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

router.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null,destination:req.file.destination,file:req.file.filename});
        });   
    });


module.exports=router;