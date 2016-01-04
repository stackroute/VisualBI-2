var express = require('express');
var path = require('path')
var routes = require('./routes/index.js');
var chartData = require('./routes/chartData.js');
var chartComments = require('./routes/chartComments.js');

var app = express();

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/chartdata', chartData);
app.use('/comments', chartComments);

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
      res.status(err.status || 500);
      res.render('error', {
         message: "err.message",
         error: err
      })
   });
}

module.exports = app;
