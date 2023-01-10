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

  populateDetailsWithTotal(filter, limit, cb) {
    Bill.fetchDetailsWithTotal(filter, limit, cb);
  }
}

module.exports = new BillService(Bill);
