const { Product } = require("../models/Product");
const BaseService = require("./BaseService");

class ProductService extends BaseService {
  constructor(model) {
    super(model);
  }
  fetchLimitWithOriginAndBranch(filter, limit, cb) {
    super.fetch(filter, {
      limit,
      populationOptions: [
        { path: "origin", select: "country -_id" },
        { path: "branch", select: "name -_id" }
      ]
    }, cb);
  }
  async findProductByName(name, cb) {
    Product.findProductByName(name, cb);
  }
}

module.exports = new ProductService(Product);