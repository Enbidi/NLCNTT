const { Admin } = require("../models/User");

module.exports = {
  async findByEmailAndPassword(email, password) {
    return await Admin.findOne({
      email,
      password
    });
  }
}