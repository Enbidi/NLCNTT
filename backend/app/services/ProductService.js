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
  findOne(filter, cb) {
    this.model.findOne(filter)
      .populate("branch")
      .populate("origin")
      .exec(cb);
  }
}

module.exports = new ProductService(Product);