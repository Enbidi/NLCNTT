const router = require("express").Router();

router.use("/comment", require("./comments"));

router.use("/bill", require("./bills"));

router.use('/settings', require('./user'))

module.exports = router;