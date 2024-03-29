var express = require('express');
var router = express.Router();

const connectEnsureLogin = require("connect-ensure-login");
/* GET home page. */
router.use(require("./publicAPI"));

// router.get("/product/:id", productAPI.productGetById);

// router.get("/product/:id/comment", productAPI.getComments);

// router.get("/product", productAPI.productsGet);

// router.get("/branch/product", branchAPI.productsPerBranchGet);

// router.get("/login", authController.loginGet);

// router.get("/signup", authController.signupGet);

// router.post("/signup", authController.signupPost);

// router.post("/login", authController.loginPost);

// router.get("/logout", authController.logoutGet);

// router.get("/auth/user_info", authController.getAuthInfo);

router.get("/dashboard", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send(`Hello ${req.user.email}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/secret">Members Only</a>`);
});

module.exports = router;
