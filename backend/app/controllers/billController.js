const { parallelValidate, sequentialValidate } = require("../validate");

const {
  body,
  header,
  param,
  query,
  matchedData,
} = require("express-validator");

const billService = require("../services/BillService");
const billDetailService = require("../services/BillDetailService");
const saleService = require("../services/SaleService");
const productService = require("../services/ProductService");
const { default: mongoose } = require("mongoose");
const { validate } = require("../middlewares/express-validator.middleware");
const RequireAuth = require("../middlewares/checkAuth");

exports.getMonthlyStatistic = [
  validate(
    query("no_month")
      .isNumeric()
      .toInt()
  ),
  (req, res) => {
    billService.getMonthlyStatistics(req.query.no_month, (err, bills) => {
      if (err) {
        return next(err)
      }
      res.status(200).json({
        items: bills
      })
    })
  }
]

exports.getRevenueInCurrentMonth = (req, res, next) => {
  billService.getRevenueInCurrentMonth((err, revenue) => {
    if (err) {
      return next(err)
    }
    if (revenue.length == 0) {
        res.status(204).send()
        return
    }
    res.status(200).json(revenue[0].revenueInMonth)
  })
}

exports.billsGet = [
  parallelValidate(query("limit").default(20)),
  async (req, res, next) => {
    // billService.populatedDetails({}, req.query.limit, async (err, bills) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   bills = await (async () =>
    //     await Promise.all(
    //       bills.map(async (bill) => ({
    //         ...bill.toObject(),
    //         total: await bill.calcTotal(),
    //       }))
    //     ))();
    //   res.status(200).json({
    //     bills,
    //   });
    // });
    billService.populateDetailsWithTotal({}, req.query.limit, (err, bills) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        items: bills,
      });
    });
  },
];

exports.addBillPost = [
  // RequireAuth,
  parallelValidate(
    header("Content-Type").isIn("application/json"),
    body("sale")
      .optional()
      .isMongoId()
      .bail()
      .custom(async (saleId) => {
        if (!(await saleService.isExist(saleId))) {
          throw new Error("Id khuyến mãi không tồn tại");
        }
        return true;
      }),
    body("details", "Thông tin chi tiết hóa đơn không hợp lệ")
      .isArray()
      .bail()
      .toArray(),
    body(
      "details.*.quantity",
      "Số lượng của chi tiết hóa đơn không hợp lệ"
    ).isNumeric(),
    body("note", "Mô tả không hợp lệ").optional().trim().escape(),
    body("details.*.product", "Id sản phẩm không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (productId) => {
        if (!(await productService.isExist(productId))) {
          throw new Error("Id sản phẩm không tồn tại");
        }
        return true;
      }),
    body("creditCard.cardType", "Loại thẻ không hợp lệ").not().isEmpty(),
    body("creditCard.cardNumber", "Số thẻ không hợp lệ").isCreditCard(),
    body("creditCard.cvv", "CVV không hợp lệ").not().isEmpty(),
    body("creditCard.expiration", "Thời hạn không hợp lệ").isISO8601(),
    body("address", "Phải cung cấp địa chỉa").not().isEmpty()
  ),
  async (req, res, next) => {
    const creditCard = {
      cardType: req.body.creditCard.cardType,
      cardNumber: req.body.creditCard.cardNumber,
      expiration: req.body.creditCard.expiration,
      CVV: req.body.creditCard.cvv,
    };
    const bill = {
      user: req.user?._id,
      sale: req.body.sale,
      note: req.body.note,
      address: req.body.address,
      creditCard,
    };
    await billService.createBill(bill, req.body.details, (err, bill) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        item: bill
      })
    })
  },
];

exports.billPatch = [
  parallelValidate(
    param("id", "Id hóa đơn không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (billId) => {
        if (!(await billService.isExist(billId))) {
          throw new Error("Id hóa đơn không tồn tại");
        }
        return true;
      }),
    body("sale")
      .optional()
      .isMongoId()
      .bail()
      .custom(async (saleId) => {
        if (!(await saleService.isExist(saleId))) {
          throw new Error("Id khuyến mãi không tồn tại");
        }
        return true;
      }),
    body("creditCard.cardType", "Loại thẻ không hợp lệ").not().isEmpty(),
    body("creditCard.cardNumber", "Số thẻ không hợp lệ").isCreditCard(),
    body("creditCard.cvv", "CVV không hợp lệ").not().isEmpty(),
    body("creditCard.expiration", "Thời hạn không hợp lệ").isISO8601()
  ),
  sequentialValidate(
    body("details", "Thông tin chi tiết hóa đơn không hợp lệ")
      .default([])
      .isArray()
      .toArray(),
    body("details.*._id", "Id chi tiết hóa đơn không hợp lệ")
      .optional()
      .isMongoId(),
    body("details.*").custom(async (detail) => {
      if (detail._id) {
        if (!detail.quantity || !detail.product || !detail.bill) {
          throw new Error("Không đủ thông tin để tạo chi tiết hóa đơn");
        }
      }
      if (isNaN(detail.quantity)) {
        throw new Error("Số lượng không hợp lệ");
      }
      if (!(await productService.isExist(detail.product))) {
        throw new Error("Id sản phẩm không tồn tại");
      }
      if (!(await billService.isExist(detail.bill))) {
        throw new Error("Id hóa đơn không tồn tại");
      }
      return true;
    })
  ),
  // parallelValidate(
  //   body("details.*.quantity", "Số lượng của chi tiết hóa đơn không hợp lệ")
  //     .if(body("details").exists())
  //     .optional()
  //     .isNumeric(),
  //   body("details.*.note", "Mô tả không hợp lệ")
  //     .if(body("details").exists())
  //     .optional()
  //     .trim()
  //     .escape(),
  //   body("details.*.product", "Id sản phẩm không hợp lệ")
  //     .if(body("details").exists())
  //     .optional()
  //     .isMongoId()
  //     .bail()
  //     .custom(async (productId) => {
  //       if (!(await productService.isExist(productId))) {
  //         throw new Error("Id sản phẩm không tồn tại");
  //       }
  //       return true;
  //     })
  // ),
  async (req, res, next) => {
    const bill = matchedData(req, { locations: ["body"] });
    // bill.details.forEach((detail) => {
    //   billDetailService.updateOne({ _id: detail._id })
    //  }
    // );
    await Promise.all(
      bill.details.map((detail) =>
        detail._id
          ? billDetailService.update({ _id: id }, detail)
          : billDetailService.createOne(detail)
      )
    );
    const billInfo = Object.fromEntries(
      Object.entries(bill).filter((e) => e[0] != "details")
    );
    billService.updateOne(
      { _id: req.params.id },
      {
        ...billInfo,
      },
      { new: true },
      (err, bill) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          updated: bill,
        });
      }
    );
  },
];

exports.billDelete = [
  parallelValidate(
    param("id", "Id hóa đơn không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (id) => {
        if (!(await billService.isExist(id))) {
          throw new Error("Id hóa đơn không tồn tại");
        }
        return true;
      })
  ),
  (req, res, next) => {
    billService.deleteOne({ _id: req.params.id }, (err, bill) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        deleted: bill,
      });
    });
  },
];

exports.deleteBills = [
  sequentialValidate(
    body("ids", "Hóa đơn muốn xóa không được trống")
      .isArray()
      .custom(ids => {
        for (let id of ids) {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Id không hợp lệ");
          }
        }
        return true;
      })
  ),
  async (req, res) => {
    var ids = req.body.ids;
    await billService.removeMany({ _id: ids });
    await billDetailService.removeMany({ bill: ids });
    res.status(200).send({
      state: "Success"
    });
  }
]

exports.getBillHistory = (req, res, next) => {
  billService.fetchBillsFromUser(req.user._id, (err, bills) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      items: bills
    });
  })
}