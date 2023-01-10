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

const { Bill } = require("../models/Bill");

exports.billsGet = [
  parallelValidate(query("limit").default(20)),
  async (req, res, next) => {
    console.log((await Bill.fetchDetailsWithTotal())[0]);
    billService.populatedDetails({}, req.query.limit, async (err, bills) => {
      if (err) {
        return next(err);
      }
      bills = await (async () =>
        await Promise.all(
          bills.map(async (bill) => ({
            ...bill.toObject(),
            total: await bill.calcTotal(),
          }))
        ))();
      res.status(200).json({
        bills,
      });
    });
  },
];

exports.addBillPost = [
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
    body("details.*.note", "Mô tả không hợp lệ").optional().trim().escape(),
    body("details.*.product", "Id sản phẩm không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (productId) => {
        if (!(await productService.isExist(productId))) {
          throw new Error("Id sản phẩm không tồn tại");
        }
        return true;
      })
  ),
  async (req, res, next) => {
    const bill = await billService.addOne({
      sale: req.param.sale,
      payment: {
        method: "Trực tiếp",
      },
    });
    // Awaiting for all details to be saved,
    // otherwise bill's populating will receive
    // empty array
    await Promise.all(
      req.body.details.map((detail) =>
        billDetailService.save({
          quantity: detail.quantity,
          note: detail.note,
          product: detail.product,
          bill: bill._id,
        })
      )
    );
    res.status(200).json({
      created: {
        ...bill.toObject(),
        total: await bill.calcTotal(),
      },
    });
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
    body("payment.method", "Phương thức thanh toán không hợp lệ")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .escape()
  ),
  sequentialValidate(
    body("details", "Thông tin chi tiết hóa đơn không hợp lệ")
      .default([])
      .isArray()
      .toArray(),
    body("details.*._id", "Id chi tiết hóa đơn không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (detailId) => {
        if (!(await billDetailService.isExist(detailId))) {
          throw new Error("Id chi tiết hóa đơn không tồn tại");
        }
        return true;
      })
  ),
  parallelValidate(
    body("details.*.quantity", "Số lượng của chi tiết hóa đơn không hợp lệ")
      .if(body("details").exists())
      .isNumeric(),
    body("details.*.note", "Mô tả không hợp lệ")
      .if(body("details").exists())
      .trim()
      .escape(),
    body("details.*.product", "Id sản phẩm không hợp lệ")
      .if(body("details").exists())
      .isMongoId()
      .bail()
      .custom(async (productId) => {
        if (!(await productService.isExist(productId))) {
          throw new Error("Id sản phẩm không tồn tại");
        }
        return true;
      })
  ),
  async (req, res, next) => {
    const bill = matchedData(req, { locations: ["body"] });
    bill.details.forEach((detail) =>
      billDetailService.updateOne({ _id: detail._id })
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
