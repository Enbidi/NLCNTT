const router = require("express").Router();
const passport = require("passport");

const passportLocalOpts = {
  failureRedirect: '/auth/login'
}

// router.use(passport.authenticate("local",passportLocalOpts), (req, res) => {
//   res.send("OK")
// });

router.use(require("./adminAPI"));

module.exports = router;