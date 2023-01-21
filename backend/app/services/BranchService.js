const BaseService = require("./BaseService");

const { Branch } = require("../models/Branch");

class BranchService extends BaseService {
  constructor(model) {
    super(model);
  }

  findBranchByName(name, cb) {
    Branch.findBranchByName(name, cb);
  }

  async fetchProductsPerBranch(cb) {
    this.model.find({})
      .populate("products")
      .exec(cb);
  }
}

module.exports = new BranchService(Branch);