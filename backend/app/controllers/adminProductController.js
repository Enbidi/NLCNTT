const { Product } = require("../models/Product");
const { Origin } = require("../models/Origin");
const { Branch } = require("../models/Branch");

const { parallelValidate } = require("../validate");

const {
  body,
  param,
  header,
  matchedData,
  query,
} = require("express-validator");

const productService = require("../services/ProductService");
const originService = require("../services/OriginService");
const branchService = require("../services/BranchService");

const mongoose = require("mongoose");

exports.productsGet = [
  query("limit").default(20).isNumeric().toFloat(),
  async (req, res, next) => {
    productService.fetchLimitWithOriginAndBranch({}, req.query.limit, (err, products) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ products });
    });
    // productService.fetchLimit({}, req.query.limit, (err, products) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.status(200).json({ products });
    // });
  },
];

exports.addProductPost = [
  parallelValidate(
    header("Content-Type").isIn(["application/json"]),
    body("name", "Tên không được trống").trim().isLength({ min: 1 }).escape(),
    body("price", "Giá không được trống")
      .trim()
      .isLength({ min: 4 })
      .matches(/\d/)
      .toFloat(),
    body("img", "Img không được trống")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("description", "Mô tả không được trống")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("origin", "Xuất sứ không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (originId) => {
        if (!(await originService.isExist(originId))) {
          throw new Error("Id xuất sứ không tồn tại");
        }
        return true;
      }),
    body("branch", "Nhãn hiệu không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (branchId) => {
        if (!(await branchService.isExist(branchId))) {
          throw new Error("Id nhãn hiệu không tồn tại");
        }
        return true;
      })
  ),
  (req, res) => {
    const product = matchedData(req, { locations: ["body"] });
    productService.createOne(product, (err, product) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        created: product,
      });
    });
  },
];

exports.productPatch = [
  parallelValidate(
    header("Content-Type").isIn(["application/json"]),
    param("id", "Id sản phẩm không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (productId) => {
        if (!(await productService.isExist(productId))) {
          throw new Error("Id sản phẩm không tồn tại");
        }
        return true;
      }),
    body("name", "Tên sản phẩm không hợp lệ")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("price", "Giá sản phẩm không hợp lệ").optional().isNumeric().toFloat(),
    body("img").optional(),
    body("description", "Mô tả sản phẩm không hợp lệ")
      .optional()
      .trim()
      .escape()
      .not()
      .isEmpty(),
    body("origin", "Xuất sứ không hợp lệ")
      .optional()
      .isMongoId()
      .bail()
      .custom(async (originId) => {
        if (!(await originService.isExist(originId))) {
          throw new Error("Id xuất sứ không tồn tại");
        }
        return true;
      }),
    body("branch", "Nhãn hiệu không hợp lệ")
      .optional()
      .isMongoId()
      .bail()
      .custom(async (branchId) => {
        if (!(await branchService.isExist(branchId))) {
          throw new Error("Id nhãn hiệu không tồn tại");
        }
        return true;
      })
  ),
  (req, res) => {
    const product = matchedData(req, {
      locations: ["body"],
    });
    productService.updateOne(
      { _id: req.param.id },
      product,
      { new: true },
      (err, product) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          updated: product,
        });
      }
    );
  },
];

exports.productDelete = [
  parallelValidate(
    param("id", "Id sản phẩm không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (productId) => {
        if (!(await productService.isExist(branchId))) {
          throw new Error("Id sản phẩm không tồn tại");
        }
        return true;
      })
  ),
  (req, res) => {
    productService.removeOne({ _id: req.params.id }, (err, product) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        deleted: product,
      });
    });
  },
];

exports.findProductByNameGet = [
  parallelValidate(
    query("keyword", "Tên sản phẩm không hợp lệ")
      .trim()
      .isLength({ min: 1 })
      .escape()
  ),
  (req, res) => {
    productService.findProductByName(req.query.keyword, (err, products) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        products,
      });
    });
  },
];
