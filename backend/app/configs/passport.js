const passport = require("passport");
const { User } = require("../models/User");
const federatedUserService = require("../services/FederatedUserService")
const userService = require("../services/UserService")
const customerService = require('../services/CustomerService')


const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oidc')

function handle(issuer, profile, cb) {
  federatedUserService.find({
    provider: issuer,
    subject: profile.id
  }, (err, federatedUser) => {
    // console.log(profile.subject)
    if (err) return cb(err)
    if (federatedUser.length == 0) {
      customerService.save({
        firstname: profile.name.familyName ?? '',
        lastname: profile.name.givenName ?? '',
        email: profile.emails[0].value,
        sex: profile.gender
      }, (err, user) => {
        if (err) return cb(err)
        var id = user._id
        var federatedUserData = {
          provider: issuer,
          subject: profile.id,
          userId: id,
          displayName: profile.displayName,
          name: {
            familyName: profile.name.familyName,
            givenName: profile.name.givenName,
            middleName: profile.name.middleName,
          },
          emails: profile.emails
        }
        federatedUserService.save(federatedUserData, (err) => {
          if (err) return cb(err)
          return cb(null, user)
        })
      })
    } else {
      userService.find({
        _id: federatedUser[0].userId
      }, (err, user) => {
        if (err) return cb(err)
        if (!user) return cb(null, false)
        return cb(null, new User(user[0]))
      })
    }
  })
}

const usePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile', 'email' ]
  }, (issuer, profile, cb) => {
    handle(issuer, profile, cb)
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
  }, (accessToken, refreshToken, profile, cb) => {
    handle(profile.provider, profile, cb)
  }))

  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

module.exports = {
  usePassport
}