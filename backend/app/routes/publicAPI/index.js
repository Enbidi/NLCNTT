const router = require("express").Router();

router.use("/auth", require("./auth"));

router.use("/product", require("./products"));

router.use("/branch", require("./branches"));

module.exports = router;