const express = require("express");
const router = express.Router();

const productAPI = require("../controllers/productController");
const originAPI = require("../controllers/originController");
const branchAPI = require("../controllers/branchController");
const userAPI = require("../controllers/userController");
const commentAPI = require("../controllers/commentController");
const saleAPI = require("../controllers/saleController");
const billAPI = require("../controllers/billController");
// router.get("/product/:id");

// router.get("/products");

router.get("/product", productAPI.productsGet);

router.post("/product/add", productAPI.addProductPost);

router.patch("/product/:id/update", productAPI.productPatch);

router.delete("/product/:id/delete", productAPI.productDelete);

router.get("/product/find", productAPI.findProductByNameGet);

// router.post("/product/:id/delete");

router.get("/branch", branchAPI.branchesGet);

router.post("/branch/add", branchAPI.addBranchPost);

router.patch("/branch/:id/update", branchAPI.branchPatch);

router.delete("/branch/:id/delete", branchAPI.deleteBranchGet);

router.get("/branch/find", branchAPI.findBranchByNameGet);


router.get("/origin", originAPI.originsGet);

router.post("/origin//add", originAPI.addOriginPost);

router.patch("/origin/:id/update", originAPI.updateOriginPost);

router.delete("/origin/:id/delete", originAPI.deleteOriginGet);

router.get("/origin/find", originAPI.findOriginByNameGet);


router.get("/user", userAPI.usersGet);

router.post("/user/add", userAPI.addUserPost);

router.patch("/user/:id/update", userAPI.userPatch);

router.delete("/user/:id/delete", userAPI.userDelete);

router.get("/user/find", userAPI.findUserByNameGet);


// Comment Routes
router.get("/commnet", commentAPI.commentsGet);

router.post("/comment/add", commentAPI.addCommentPost);

router.patch("/comment/:id/update", commentAPI.commentPatch);

router.delete("/comment/:id/delete", commentAPI.commentDelete);

router.get("/comment/find", commentAPI.findCommentByContent);

// Sale Routes

router.get("/sale", saleAPI.salesGet);

router.post("/sale/add", saleAPI.addSalePost);

router.patch("/sale/:id/update", saleAPI.salePatch);

router.delete("/sale/:id/delete", saleAPI.saleDelete);

// router.get("/sale/find", saleAPI.findCommentByContent);

// Bill Routes

router.get("/bill", billAPI.billsGet);

router.post("/bill/add", billAPI.addBillPost);

router.patch("/bill/:id/update", billAPI.billPatch);

router.delete("/bill/:id/delete", billAPI.billDelete);

// router.get("/bill/find", billAPI.findCommentByContent);

module.exports = router;