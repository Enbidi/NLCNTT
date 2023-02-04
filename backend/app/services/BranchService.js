const BaseService = require("./BaseService");

const { Branch } = require("../models/Branch");

class BranchService extends BaseService {
  constructor(model) {
    super(model);
  }

  findBranchByName(name, cb) {
    Branch.findBranchByName(name, cb);
  }

  async fetchProductsPerBranch(filter, cb) {
    this.model.find(filter)
      .populate({
        path: "products",
        populate: ["inSales", "origin"]
      })
      .exec(cb);
  }
}

module.exports = new BranchService(Branch);