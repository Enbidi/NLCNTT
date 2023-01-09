const BaseService = require("./BaseService");
const billDetailService = require("./BillDetailService");
const { Bill } = require("../models/Bill");

class BillService extends BaseService {
  constructor(model) {
    super(model);
  }

  async populatedDetails(limit, cb) {
    this.model.find()
      .populate("details")
      .limit(limit)
      .exec(cb)
  }
}

module.exports = new BillService(Bill);
