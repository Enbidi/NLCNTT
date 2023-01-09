const { Sale } = require("../models/Sale");
const BaseService = require("./BaseService");

class SaleService extends BaseService {
  constructor(model) {
    super(model);
  }
}

module.exports = new SaleService(Sale);