require('./env');
const database_config = require('./config/database');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const api = require('./routes/api.route');

const bluebird = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = bluebird
mongoose.connect(database_config.uri)
.then(()=> { console.log('Succesfully Connected to the Mongodb Database ' + database_config.db)})
.catch(()=> { console.log('Error Connecting to the Mongodb Database ' + database_config.db)});

const app = express();

// cors
app.use(function(req, res, next) {
  const allowedOrigins = ['http://uncledecor.com', 'http://67.209.127.191'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
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
