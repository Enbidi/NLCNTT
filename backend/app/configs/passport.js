const passport = require("passport");
const { User } = require("../models/User");

const usePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

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
}

module.exports = {
  usePassport
}