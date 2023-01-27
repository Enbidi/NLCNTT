const BaseService = require("./BaseService");

const CreditCard = require("../models/CreditCard");

class CreditCardService extends BaseService {
  constructor(model) {
    super(model);
  }
}

module.exports = new CreditCardService(CreditCard);