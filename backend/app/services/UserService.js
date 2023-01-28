const BaseService = require("./BaseService");

const { User } = require("../models/User");

const billService = require("./BillService");

class UserService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findUserByEmail(email, cb) {
    await this.model.findOne({ email }).exec();
  }

  async fetchBills(filter, cb) {
    if (cb) {
      this.model.find(filter)
        .populate("bills")
        .exec(cb);
      return;
    }
    return await this.model.find(filter).exec();
  }

  // async deleteOne(id, cb) {
  //   super.deleteOne(id).then(cb);
  // }

  // async updateOne(id, obj, cb) {
  //   super.updateOne(id, obj).then(cb);
  // }

  // async createOne(obj, cb) {
  //   super.createOne(obj).then(cb);
  // }

  // async fetchLimit(limit, cb) {
  //   super.fetchLimit(limit, cb);
  // }
}

module.exports = new UserService(User);