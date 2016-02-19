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
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
//Third party modules
var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
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
    chartdataRouter = require('./routes/chartDataRouter'),
    dbConfig = require('./config/db'),
    Credential = dbConfig.credentialModel,
    gridRouter = require('./routes/gridRouter'),
    commentsRouter = require('./routes/commentsRouter'),
    dashboardRouter  = require('./routes/dashboardRouter');
	uploadImageRouter=require('./routes/uploadImageRouter');

var app = express();
var env = app.get('env');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var cpath = env == 'development' ? 'public' : '../public';
app.use(express.static(path.join(__dirname, cpath)));
// instruct the app to use the `bodyParser()` middleware for all routes
app.use(cookieParser('tobo'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());

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
app.use('/upload',uploadImageRouter);

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
