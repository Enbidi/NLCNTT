const { Sale } = require("../models/Sale");
const BaseService = require("./BaseService");

class SaleService extends BaseService {
  constructor(model) {
    super(model);
  }
  async getActiveSales(cb) {
    var filter = {
      end: {
        $gt: new Date()
      }
    }
    await this.model.find(filter).exec(cb)
  }
}

module.exports = new SaleService(Sale);