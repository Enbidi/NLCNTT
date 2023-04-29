const router = require("express").Router();

router.use("/auth", require("./auth"));

router.use('/oauth2', require('./oauth2'))

router.use("/product", require("./products"));

router.use("/branch", require("./branches"));

module.exports = router;