const router = require("express").Router();


const authController = require("../../controllers/authController");
/* GET home page. */

router.get("/login", authController.loginGet);

router.get("/signup", authController.signupGet);

router.post("/signup", authController.signupPost);

router.post("/login", authController.loginPost);

router.get("/logout", authController.logoutGet);

router.get("/user_info", authController.getAuthInfo);

module.exports = router;
