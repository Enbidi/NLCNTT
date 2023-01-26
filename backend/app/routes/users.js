var express = require('express');
var router = express.Router();

router.use(require("./userAPI"));

// var productAPI = require("../controllers/productController");
// var commentAPI = require("../controllers/commentController");
// /* GET users listing. */
// router.get("/product", productAPI.productsGet);

// router.get("/product/:id", productAPI.productGetById);

// router.post("/comment/add", commentAPI.addCommentPost);

module.exports = router;
