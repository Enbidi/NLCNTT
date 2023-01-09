const BaseService = require("./BaseService");

const { BillDetail } = require("../models/BillDetail");

class BillDetailService extends BaseService {
  constructor(model) {
    super(model);
  }
}

module.exports = new BillDetailService(BillDetail);