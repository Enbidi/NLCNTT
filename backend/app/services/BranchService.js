const BaseService = require("./BaseService");

const { Branch } = require("../models/Branch");

class BranchService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findBranchByName(name, cb) {
    Branch.findBranchByName(name, cb);
  }
}

module.exports = new BranchService(Branch);