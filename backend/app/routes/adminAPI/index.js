var router = require("express").Router();

router.use("/user", require("./users"));
router.use("/comment", require("./comments"));
router.use("/bill", require("./bills"));
router.use("/product", require("./products"));
router.use("/origin", require("./origins"));
router.use("/sale", require("./sales"));
router.use("/branch", require("./branches"));

module.exports = router;

