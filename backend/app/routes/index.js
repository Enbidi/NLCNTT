var express = require('express');
var router = express.Router();

const authController = require("../controllers/authController");
const connectEnsureLogin = require("connect-ensure-login");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login", authController.loginGet);

router.post("/login", authController.loginPost);

router.get("/logout", authController.logoutGet);

router.get("/dashboard", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send(`Hello ${req.user.email}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/secret">Members Only</a>`);
});

module.exports = router;
