require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var helmet = require('helmet');
var { ensureLoggedIn } = require("connect-ensure-login");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var { usePassport } = require("./configs/passport");

var app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set("strictQuery", false);
const { User } = require("./models/User");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(helmet());

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Uses session after cookieParser, otherwise error will occur
app.use(session({
  secret: "thisisasecret",
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 60 * 60 * 100 },
}));

usePassport(app);

app.use(express.static(path.join(__dirname, 'public')));
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
// passport.deserializeUser(function(user, cb) {
//   process.nextTick(() => {
//     return cb(null, user);
//   })
// })

app.use('/', indexRouter);
app.use("/user_ui", express.static(path.join(__dirname, 'user_files')));
app.use('/user', usersRouter);
app.use('/admin_ui', ensureLoggedIn('/auth/login'), express.static(path.join(__dirname, 'admin_files')));
app.use('/admin', adminRouter);
app.use("/dummy", (req, res, next) => {
  var billService = require("./services/BillService");
  billService.getMonthlyStatistics((err, bills) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      items: bills
    });
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
