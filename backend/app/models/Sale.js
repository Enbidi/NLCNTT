const mongoose = require("mongoose");

const { Schema } = mongoose;

const SaleSchema = new Schema(
  {
    start: Date,
    end: Date,
    percent: Number,
    content: String,
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
  },
  { toJSON: { virtuals: true } }
);

SaleSchema.virtual("isExpired").get(function () {
  return this.end < new Date();
});

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = { Sale };
