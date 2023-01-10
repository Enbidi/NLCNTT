const mongoose = require("mongoose");

const { Schema } = mongoose;
const { PaymentSchema } = require("./Payment");
const { BillDetail } = require("./BillDetail");
const { Product } = require("./Product");

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
    toObject: { virtuals: true },
  }
);

BillSchema.virtual("details", {
  ref: "BillDetail",
  localField: "_id",
  foreignField: "bill",
});

BillSchema.virtual("total", {
  ref: "BillDetail",
  localField: "_id",
  foreignField: "bill",
});

BillSchema.method("calcTotal", async function () {
  const { details } = await this.populate({
    path: "details",
    populate: {
      path: "product",
      select: "price -_id",
      model: "Product",
    },
  });
  return details.reduce(
    (acc, detail) => acc + detail.product.price * detail.quantity,
    0
  );
});

BillSchema.statics.fetchDetailsWithTotal = function (filter, limit, cb) {
  this.aggregate([
    {
      $match: filter
    },
    {
      $lookup: {
        from: BillDetail.collection.collectionName,
        localField: "_id",
        foreignField: "bill",
        as: "details",
        pipeline: [
          {
            $lookup: {
              from: Product.collection.collectionName,
              localField: "product",
              foreignField: "_id",
              as: "productDetail",
              pipeline: [
                {
                  $project: {
                    price: 1,
                    _id: 0,
                  },
                },
              ],
            },
          },
          {
            $project: {
              quantity: 1,
              price: {
                $arrayElemAt: ["$productDetail.price", 0],
              },
            },
          },
          {
            $project: {
              quantity: 1,
              price: 1,
              unitPrice: {
                $multiply: ["$quantity", "$price"],
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        details: 1,
        total: {
          $sum: "$details.unitPrice",
        },
      },
    },
  ]).limit(limit).exec(cb);
};

const Bill = mongoose.model("Bill", BillSchema);

module.exports = { Bill };
