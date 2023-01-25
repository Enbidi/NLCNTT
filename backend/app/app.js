require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var helmet = require('helmet');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set("strictQuery", false);

const { User } = require("./models/User");
// User.register({
//   firstname: "Nguyen",
//   lastname: "Duy",
//   sex: "Male",
//   number: "0789526780",
//   email: "duy.gunny2.1705@gmail.com",
// }, "123456789");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Uses session after cookieParser, otherwise error will occur
app.use(session({
  secret: "thisisasecret",
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 60 * 60 * 100 },
}));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
// passport.serializeUser(function(user, cb) {
//   process.nextTick(User.serializeUser(), user, cb);
// });
// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, {
//       id: user._id,
//       email: user.email,
//       firstname: user.firstname,
//       lastname: user.lastname
//     })
//   })
// })
passport.deserializeUser(User.deserializeUser());
// passport.deserializeUser(function(user, cb) {
//   process.nextTick(() => {
//     return cb(null, user);
//   })
// })

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);

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
