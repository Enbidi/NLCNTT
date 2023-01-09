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
  }
);

BillSchema.virtual("details", {
  ref: "BillDetail",
  localField: "_id",
  foreignField: "bill",
});

BillSchema.virtual("total").get(async function () {
  const { details } = await this.populate("details");
  return details.reduce((detail) => detail.product.price * detail.quantity, 0);
});

const Bill = mongoose.model("Bill", BillSchema);

module.exports = { Bill };
