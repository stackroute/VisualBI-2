//Third party modules
var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    expressSession = require('express-session'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
	 passport = require('passport'),
	 LocalStrategy = require('passport-local').Strategy;

//custom modules
var indexRouter = require('./routes/indexRouter'),
    userRouter = require('./routes/userRouter'),
    widgetRouter = require('./routes/widgetRouter'),
    widgetMdxRouter = require('./routes/widgetMdxRouter'),
    dashboardRouter = require('./routes/dashboardRouter'),
    chartdataRouter = require('./routes/chartdataRouter'),
    dbConfig = require('./config/db'),
    Credential = dbConfig.credentialModel,
    gridRouter = require('./routes/gridRouter'),
    commentsRouter = require('./routes/commentsRouter'),
    dashboardRouter  = require('./routes/dashboardRouter');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
// instruct the app to use the `bodyParser()` middleware for all routes
app.use(cookieParser('tobo'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());


//TODO: keep multer related stuff separate file
//TODO: create a separate folder for user profile images
//TODO: error handling should be standerd - put res.status
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, 'public/images/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

 var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
    });

//initialize passort sessions
app.use(expressSession({
   secret: 'keyboard cat',
   cookie: { maxAge: 3600000 },
   proxy: true,
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Credential.authenticate()));
passport.serializeUser(Credential.serializeUser());
passport.deserializeUser(Credential.deserializeUser());


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/widgets', widgetRouter);
app.use('/widgetsMdx', widgetMdxRouter);
app.use('/comment', commentsRouter);
app.use('/chartdata', chartdataRouter);
app.use('/execute', gridRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error('Not found');
   err.status = 404;
   next();
});

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
   app.use(function(err, req, res, next) {
		console.log("in error handler", err)
      res.status(err.status || 500);
      res.render('error', {
         message: "err.message",
         error: err
      })
   });
}

module.exports = app;
