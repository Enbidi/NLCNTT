const mongoose = require("mongoose");

const { Schema } = mongoose;
const { PaymentSchema } = require("./Payment");
const { BillDetail } = require("./BillDetail");

const BillSchema = new Schema(
  {
    sale: {
      type: Schema.Types.ObjectId,
      ref: "Sale",
    },
    payment: PaymentSchema,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

BillSchema.virtual("details", {
  ref: "BillDetail",
  localField: "_id",
  foreignField: "bill"
});

BillSchema.virtual("total", {
  ref: "BillDetail",
  localField: "_id",
  foreignField: "bill"
});

BillSchema.method("calcTotal", async function() {
  const { details } = await this.populate({
    path: "details",
    populate: {
      path: "product",
      select: "price -_id",
      model: "Product"
    }
  });
  return details.reduce((acc, detail) => acc + detail.product.price * detail.quantity, 0);
});

const Bill = mongoose.model("Bill", BillSchema);

module.exports = { Bill };
