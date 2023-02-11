const passport = require("passport");
const { User } = require("../models/User");

const usePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

module.exports = {
  usePassport
}