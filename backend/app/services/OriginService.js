const BaseService = require("./BaseService");

const { Origin } = require("../models/Origin");

class OriginService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findOriginByCountry(country, cb) {
    Origin.findOriginByCountry(country, cb);
  }
}

module.exports = new OriginService(Origin);