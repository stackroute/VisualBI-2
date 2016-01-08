var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    routes = require('./routes/index.js'),
    chartData = require('./routes/chartData.js'),
    chartComments = require('./routes/chartComments.js');

var dbPath = "mongodb://localhost:27017/visualdb";
mongoose.connect(dbPath);
var db = mongoose.connection;

var app = express();

db.on('error', console.error);
db.once('open', function() {
   console.log('Connected to database successfully');

});

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
