var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users.controller.js');
var dashboard = require('./routes/dashboard');
var db = require('./config/db');


mongoose.connect(db.url, function(err, res) {
if(err) throw err;
  console.log("mongoose connected");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// var Connection = require('tedious').Connection;
// var config = {
//     userName: 'vohab',
//     password: 'vohabpassword123!',
//     server: 'vohab.database.windows.net',
//     // If you are on Microsoft Azure, you need this:
//     options: {encrypt: true, database: 'AdventureWorks'}
// };
// var connection = new Connection(config);
// connection.on('connect', function(err) {
// // If no error, then good to proceed.
//     console.log("Connected");
// });
console.log('here'); 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/dashboard', dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
