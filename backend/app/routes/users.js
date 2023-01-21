var express = require('express');
var router = express.Router();

var productAPI = require("../controllers/productController");
/* GET users listing. */
router.get("/product", productAPI.productsGet);

router.get("/product/:id", productAPI.productGetById);

module.exports = router;
