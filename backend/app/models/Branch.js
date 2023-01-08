const mongoose = require("mongoose");

const { Schema } = mongoose;

const BranchSchema = new Schema({
  name: String
});

const Branch = mongoose.model("Branch", BranchSchema);

module.exports = { Branch };