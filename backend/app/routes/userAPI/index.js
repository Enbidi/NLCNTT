const router = require("express").Router();

router.use("/comment", require("./comments"));

router.use("/bill", require("./bills"));

module.exports = router;