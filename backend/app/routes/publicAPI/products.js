const router = require("express").Router();

const productController = require("../../controllers/productController");

router.get("/", productController.productsGet);

router.get("/:id([a-fA-F0-9]{24})", productController.productGetById);

router.get("/:id([0-9a-fA-F]{24})/comment", productController.getComments);

router.get("/find", productController.findProductByNameGet);

router.get("/top_products", productController.topPurchasedProducts);

module.exports = router;
