const router = require("express").Router();

router.use("/comment", require("./comments"));

module.exports = router;