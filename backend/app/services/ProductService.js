const { Product } = require("../models/Product");
const BaseService = require("./BaseService");

class ProductService extends BaseService {
  constructor(model) {
    super(model);
  }
  fetchLimitWithOriginAndBranch(filter, limit, cb) {
    super.fetch(
      filter,
      {
        limit,
        populationOptions: [
          { path: "origin", select: "country _id" },
          { path: "branch", select: "name _id" },
        ],
      },
      cb
    );
  }
  async findProductByName(name, cb) {
    Product.findProductByName(name, cb);
  }
  async fetchComments(filter, cb) {
    if (cb) {
      this.model.findOne(filter, "_id")
        .populate("comments")
        .exec(cb);
      return;
    }
    await this.model.findOne(filter, "_id").populate("comments");
  }
  findOne(filter, cb) {
    this.model.findOne(filter).populate("branch").populate("origin").exec(cb);
  }
  async getTopPurchasedProducts(top, cb) {
    if (cb) {
      this.model.find()
        .populate("billsCount")
        .sort("-billsCount")
        .limit(top)
        .exec(cb);
      return;
    }
    return await this.model.find()
      .populate("billsCount")
      .sort("-billsCount")
      .limit(top)
      .exec();
  }
}

module.exports = new ProductService(Product);
