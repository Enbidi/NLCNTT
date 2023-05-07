const router = require("express").Router();
const { ensureLoggedIn } = require("connect-ensure-login");
const passport = require("passport");

const passportLocalOpts = {
  failureRedirect: '/auth/login'
}

// router.use(passport.authenticate("local", passportLocalOpts), (req, res, next) => {
//   // if (req.user)
//   next()
// });

router.use(ensureLoggedIn('/auth/login'), (req, res, next) => {
  if (req.user.role != 'Admin') {
    res.redirect('/auth/login')
    return
  }
  next()
})

router.use(require("./adminAPI"));

module.exports = router;