const mongoose = require("mongoose");

const { Schema } = mongoose;

const SaleSchema = new Schema({
  start: Date,
  end: Date
});

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = { Sale };