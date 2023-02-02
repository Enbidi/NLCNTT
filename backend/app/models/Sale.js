const mongoose = require("mongoose");

const { Schema } = mongoose;

const options = {
  discriminatorKey: "saleType",
  toJSON: { virtuals: true }
};

const PromotionSchema = new Schema({
  percent: Number
});

const DiscountSchema = new Schema({
  value: Number
});

const SaleSchema = new Schema(
  {
    start: Date,
    end: Date,
    percent: Number,
    content: String,
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
  },
  options
);

SaleSchema.virtual("isExpired").get(function () {
  return this.end < new Date();
});

const Sale = mongoose.model("Sale", SaleSchema);
const PromotionSale = Sale.discriminator("Promotion", PromotionSchema, options);
const DiscountSale = Sale.discriminator("Discount", DiscountSchema, options);
module.exports = { Sale, PromotionSale, DiscountSale };
