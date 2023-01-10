const { parallelValidate } = require("../validate");

const { body, header, param, query } = require("express-validator");

const billService = require("../services/BillService");
const billDetailService = require("../services/BillDetailService");
const saleService = require("../services/SaleService");
const productService = require("../services/ProductService");

const { Bill } = require("../models/Bill");

exports.billsGet = [
  parallelValidate(query("limit").default(20)),
  async (req, res, next) => {
    billService.populatedDetails(req.query.limit, (err, bills) => {
      if (err) {
        return next(err);
      }
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

exports.salePatch = [
  parallelValidate(
    param("id", "Id hóa đơn không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async billId => {
        if (!(await billDetailService.isExist(billId))) {
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
  (req, res, next) => {
    const sale = matchedData(req, { locations: ["body"] });
    saleService.updateOne(req.params.id, sale, { new: true }, (err, sale) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        updated: sale,
      });
    });
  },
];

exports.saleDelete = [
  parallelValidate(
    param("id", "Id khuyến mãi không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (id) => {
        if (!(await saleService.isExist(id))) {
          throw new Error("Id khuyến mãi không tồn tại");
        }
        return true;
      })
  ),
  (req, res, next) => {
    saleService.deleteOne(req.params.id, (err, sale) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        deleted: sale,
      });
    });
  },
];
