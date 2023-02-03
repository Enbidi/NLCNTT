const mongoose = require("mongoose");

const { Schema } = mongoose;
const { BillDetail } = require("./BillDetail");
const { Product } = require("./Product");
const { Sale } = require("./Sale");

const CreditCardSchema = new Schema(
  {
    cardType: String,
    cardNumber: {
      type: String,
      unique: true,
    },
    CVV: String,
    expiration: Date,
  },
  { _id: false }
);

const BillSchema = new Schema(
  {
    creditCard: CreditCardSchema,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    note: String,
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

BillSchema.statics.fetchDetailsWithTotal = async function (filter, limit, cb) {
  return await this.aggregate([
    {
      $match: filter,
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
            $lookup: {
              from: Sale.collection.collectionName,
              localField: "sales",
              foreignField: "_id",
              as: "saleDetails",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    start: 1,
                    end: 1,
                    percent: 1,
                    saleType: 1,
                  },
                },
              ],
            },
          },
          {
            $project: {
              quantity: 1,
              saleDetails: 1,
              unitPrice: {
                $arrayElemAt: ["$productDetail.price", 0],
              },
            },
          },
          {
            $project: {
              quantity: 1,
              unitPriceBeforeSale: "$unitPrice",
              saleDetails: 1,
              unitPrice: {
                $cond: {
                  if: {
                    $cond: {
                      if: {
                        $isArray: "$saleDetails"
                      },
                      then: { $ne: [ { $size: "$saleDetails" }, 0 ] },
                      else: false
                    }
                  },
                  then: {
                    $reduce: {
                      input: "$saleDetails",
                      initialValue: "$unitPrice",
                      in: {
                        $subtract: [
                          "$$value",
                          {
                            $switch: {
                              branches: [
                                {
                                  case: {
                                    $eq: ["$$this.saleType", "Promotion"],
                                  },
                                  then: {
                                    $multiply: ["$$value", { $divide: ["$$this.percent", 100] }],
                                  },
                                },
                                {
                                  case: {
                                    $eq: ["$$this.saleType", "Discount"],
                                  },
                                  then: "$$this.value",
                                },
                              ],
                              default: 0,
                            },
                          },
                        ],
                      },
                    },
                  },
                  else: "$unitPrice"
                },
              },
            },
          },
          {
            $project: {
              quantity: 1,
              saleDetails: 1,
              unitPriceBeforeSale: 1,
              unitPrice: {
                $multiply: ["$quantity", "$unitPrice"],
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        creditCard: 1,
        details: 1,
        createdAt: 1,
        updatedAt: 1,
        user: 1,
        saleDetails: 1,
        total: {
          $sum: "$details.unitPrice",
        },
      },
    },
  ])
    .limit(limit)
    .exec(cb);
};

const Bill = mongoose.model("Bill", BillSchema);

module.exports = { Bill };
