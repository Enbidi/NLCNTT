const express = require("express");
const router = express.Router();

const adminProductController = require("../controllers/adminProductController");
const adminOriginController = require("../controllers/adminOriginController");
const adminBranchController = require("../controllers/adminBranchController");
const adminUserController = require("../controllers/adminUserController");
const adminCommentsController = require("../controllers/adminCommentController");
const adminSaleController = require("../controllers/adminSaleController");
const adminBillController = require("../controllers/adminBillController");
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


router.get("/users", adminUserController.usersGet);

router.post("/user/add", adminUserController.addUserPost);

router.patch("/user/:id/update", adminUserController.userPatch);

router.delete("/user/:id/delete", adminUserController.userDelete);

router.get("/user/find", adminUserController.findUserByNameGet);


// Comment Routes
router.get("/commnets", adminCommentsController.commentsGet);

router.post("/comment/add", adminCommentsController.addCommentPost);

router.patch("/comment/:id/update", adminCommentsController.commentPatch);

router.delete("/comment/:id/delete", adminCommentsController.commentDelete);

router.get("/comment/find", adminCommentsController.findCommentByContent);

// Sale Routes

router.get("/sales", adminSaleController.salesGet);

router.post("/sale/add", adminSaleController.addSalePost);

router.patch("/sale/:id/update", adminSaleController.salePatch);

router.delete("/sale/:id/delete", adminSaleController.saleDelete);

// router.get("/sale/find", adminSaleController.findCommentByContent);

// Bill Routes

router.get("/bills", adminBillController.billsGet);

router.post("/bill/add", adminBillController.addBillPost);

// router.patch("/bill/:id/update", adminBillController.commentPatch);

// router.delete("/bill/:id/delete", adminBillController.commentDelete);

// router.get("/bill/find", adminBillController.findCommentByContent);

module.exports = router;