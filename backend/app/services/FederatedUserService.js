const BaseService = require("./BaseService");

const { FederatedUser } = require("../models/FederatedUser");

class FederatedUserService extends BaseService {
  constructor(model) {
    super(model);
  }

  getUser(filter, cb) {
    this.model.find(filter, cb)
  }
}

module.exports = new FederatedUserService(FederatedUser);