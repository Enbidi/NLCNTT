const BaseService = require("./BaseService");
const billDetailService = require("./BillDetailService");
const { Bill } = require("../models/Bill");

class BillService extends BaseService {
  constructor(model) {
    super(model);
  }

  async populatedDetails(filter, limit, cb) {
    this.model.find(filter)
      .populate("details")
      .limit(limit)
      .exec(cb)
  }

  async fetchBillsFromUser(userId, cb) {
    var filter = { user: userId }
    console.log(filter);
    if (cb) {
      this.model.find(filter)
        .populate("details")
        .exec(cb);
      return;
    }
    return await this.model.find(filter)
      .populate("details")
      .exec();
  }

  populateDetailsWithTotal(filter, limit, cb) {
    Bill.fetchDetailsWithTotal(filter, limit, cb);
  }
}

module.exports = new BillService(Bill);
