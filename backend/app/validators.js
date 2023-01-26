const { param } = require("express-validator");

const productService = require("./services/ProductService");

exports.validateProductParam = param("id", "ID sản phẩm không hợp lệ")
  .isMongoId()
  .bail()
  .custom(async (productId) => {
    if (!(await productService.isExist(productId))) {
      throw new Error("Id sản phẩm không tồn tại");
    }
    return true;
  });
  