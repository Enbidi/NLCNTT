const router = require("express").Router();

const branchController = require("../../controllers/branchController");

router.get("/product", branchController.productsPerBranchGet);

module.exports = router;
