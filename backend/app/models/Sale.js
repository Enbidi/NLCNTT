const mongoose = require("mongoose");

const { Schema } = mongoose;

const SaleSchema = new Schema(
  {
    start: Date,
    end: Date,
  },
  { toJSON: { virtuals: true } }
);

SaleSchema.virtual("isExpired").get(function () {
  return this.end < new Date();
});

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = { Sale };
