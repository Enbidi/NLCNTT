const express = require("express");
const router = express.Router();

const adminProductController = require("../controllers/adminProductController");
const adminOriginController = require("../controllers/adminOriginController");
const adminBranchController = require("../controllers/adminBranchController");

// router.get("/product/:id");

// router.get("/products");

router.get("/products", adminProductController.productsGet);

router.post("/product/add", adminProductController.addProductPost);

router.patch("/product/:id/update", adminProductController.productPatch);

router.delete("/product/:id/delete", adminProductController.productDelete);

router.get("/product/find", adminProductController.findProductByNameGet);

// router.post("/product/:id/delete");

router.get("/branches", adminBranchController.branchesGet);

router.post("/branch/add", adminBranchController.addBranchPost);

router.post("/branch/update", adminBranchController.updateBranchPost);

router.get("/branch/:id/delete", adminBranchController.deleteBranchGet);

router.get("/branch/find", adminBranchController.findBranchByNameGet);


router.get("/origins", adminOriginController.originsGet);

router.post("/origin/:id/update", adminOriginController.updateOriginPost);

router.post("/origin/add", adminOriginController.addOriginPost);

router.get("/origin/:id/delete", adminOriginController.deleteOriginGet);

router.get("/origin/find", adminOriginController.findOriginByNameGet);

module.exports = router;