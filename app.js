var createError = require('http-errors');
var express = require('express');
var path = require('path');

var fs = require('fs');
var mongoose = require('mongoose');
var config = require('./config/database');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var errorHandler = require('./middleware/error');

// passport auth
var passport = require('passport');
var cors = require('cors');


// models
var News = require('./models/news');
var User = require('./models/user');

// routes
var newsRouter = require('./routes/news');
var authRooter = require('./routes/authentification');

mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true });

var app = express();

// express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });
// setup the logger
//app.use(logger('combined', { stream: accessLogStream }));
app.use(logger('dev'));


// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.send('Page under construction.');
});


app.use('/api', newsRouter(News));
app.use('/api', authRooter);


// passport init
app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
