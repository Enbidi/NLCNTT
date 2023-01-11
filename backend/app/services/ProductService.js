const { Product } = require("../models/Product");
const BaseService = require("./BaseService");

class ProductService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findProductByName(name, cb) {
    Product.findProductByName(name, cb);
  }
}

module.exports = new ProductService(Product);