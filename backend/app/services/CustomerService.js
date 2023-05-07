const { Customer } = require("../models/User");
const BaseService = require("./BaseService");

class CustomerService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findUserByEmail(email, cb) {
    await this.model.findOne({ email }).exec();
  }

  async getMonthlyRegisteredUsers(limit, cb) {
    var res = await User.getMonthlyRegisteredUsers(limit, cb)
    return res
  }
}

module.exports = new CustomerService(Customer);