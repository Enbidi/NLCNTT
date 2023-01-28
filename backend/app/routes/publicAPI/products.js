const router = require("express").Router();

const productController = require("../../controllers/productController");

router.get("/", productController.productsGet);

router.get("/:id(^[0-9a-fA-F]{24}$)", productController.productGetById);

router.get("/:id/comment", productController.getComments);

router.get("/find", productController.findProductByNameGet);

module.exports = router;
