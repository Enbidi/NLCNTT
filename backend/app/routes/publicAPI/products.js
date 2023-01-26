const router = require("express").Router();

const productController = require("../../controllers/productController");

router.get("/", productController.productsGet);

router.get("/:id", productController.productGetById);

router.get("/:id/comment", productController.getComments);


module.exports = router;
