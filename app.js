const env = require('./env');
const database_config = require('./config/database');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes/api.route');

var bluebird = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = bluebird
mongoose.connect(database_config.uri)
.then(()=> { console.log('Succesfully Connected to the Mongodb Database ' + database_config.db)})
.catch(()=> { console.log('Error Connecting to the Mongodb Database ' + database_config.db)});

var app = express();

// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://uncledecor.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

// app route
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
