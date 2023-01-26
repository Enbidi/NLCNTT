const express = require("express");
const router = express.Router();

const branchController = require("../../controllers/branchController");

router.get("/", branchController.branchesGet);

router.post("/add", branchController.addBranchPost);

router.patch("/:id/update", branchController.branchPatch);

router.delete("/:id/delete", branchController.deleteBranchGet);

router.get("/find", branchController.findBranchByNameGet);

module.exports = router;