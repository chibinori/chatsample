var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var home = require('./routes/home');
var reception = require('./routes/reception');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッション周りでで以下追加 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

var sessionCheck = function(req, res, next) {
  if (req.session.user) {
    console.log("sessionCheck");
    next();
  } else {
    res.redirect('/login');
  }
};

var homeCheck = function(req, res, next) {
  if (req.session.user) {
    console.log("homeCheck");
    res.redirect('/home');
  } else {
    next();
  }
};

var logoutCheck = function(req, res, next) {
  if (req.session.user) {
    console.log("logoutCheck");
    next();
  } else {
    res.redirect('/');
  }
};

app.use('/login', login);
app.use('/logout', logoutCheck, logout);
app.use('/reception', reception);
app.use('/home', sessionCheck, home);  // sessionCheckを前処理に追加
app.use('/', homeCheck, routes);
app.use('/users', users);

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