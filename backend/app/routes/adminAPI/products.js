const express = require("express");
const router = express.Router();

const productController = require("../../controllers/productController");

// router.get("/product/:id");

// router.get("/products");

// router.param("productId", async (req, res, next, productId) => {
//   var validator = param("productId", "Id sản phẩm không hợp lệ")
//     .isMongoId()
//     .bail()
//     .custom(async productId => {
//       if (!(await productService.isExist(productId))) {
//         throw new Error("Id sản phẩm không tồn tại");
//       }
//       return true;
//     });
//   await validator.run(req);
//   var errors = validationResult(req);
//   if (errors.isEmpty()) {
//     return next();
//   }
//   res.status(400).json({
//     errors: errors.array()
//   });
// })

router.get("/", productController.productsGet);

router.post("/add", productController.addProductPost);

router.delete("/delete", productController.deleteProducts);

router.patch("/:id/update", productController.productPatch);

router.delete("/:id/delete", productController.productDelete);

router.get("/find", productController.findProductByNameGet);

router.get("/size", productController.getSize);

module.exports = router;