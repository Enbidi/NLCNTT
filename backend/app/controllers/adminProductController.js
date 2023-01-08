const { Product } = require("../models/Product");
const { Origin } = require("../models/Origin");
const { Branch } = require("../models/Branch");

const { parallelValidate } = require("../validate");

const { body, param, header, matchedData, query } = require("express-validator");

const mongoose = require("mongoose");

exports.productsGet = async (req, res) => {
  Product.find().then((products) => {
    res.status(200).json(products);
  });
};

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
      .escape()
      .if((originId) => mongoose.Types.ObjectId.isValid(originId))
      .custom((originId) => {
        Origin.findById(originId).then((origin) => {
          if (!origin) {
            Promise.reject("Xuất sứ không tồn tại");
          }
        });
        return true;
      })
      .customSanitizer((originId) => {
        return mongoose.Types.ObjectId(originId);
      }),
    body("branch", "Nhãn hiệu không hợp lệ")
      .escape()
      .if((branchId) => mongoose.Types.ObjectId.isValid(branchId))
      .custom((branchId) => {
        Branch.findById(branchId).then((branch) => {
          if (!branch) {
            Promise.reject("Nhãn hiệu không tồn tại");
          }
        });
        return true;
      })
      .customSanitizer((branchId) => {
        return mongoose.Types.ObjectId(branchId);
      })
  ),
  (req, res) => {
    Product.create({
      name: req.body.name,
      price: req.body.price,
      img: req.body.img,
      description: req.body.description,
      origin: req.body.origin,
      branch: req.body.branch,
    }).then((product) => {
      res.status(200).json({
        added: product,
      });
    });
  },
];

exports.productPatch = [
  parallelValidate(
    header("Content-Type").isIn(["application/json"]),
    param("id", "Id sản phẩm không hợp lệ")
      .if((id) => mongoose.Types.ObjectId.isValid(id))
      .custom((id) => {
        if (!Product.exists(id)) {
          throw new Error("Id sản phẩm không tồn tại");
        }
        return true;
      }),
    body("name", "Tên sản phẩm không hợp lệ")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("price", "Giá sản phẩm không hợp lệ").optional().isNumeric(),
    body("img").optional(),
    body("description", "Mô tả sản phẩm không hợp lệ")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("origin", "Xuất sứ không hợp lệ")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .escape()
      .if((originId) => mongoose.Types.ObjectId.isValid(originId))
      .custom((originId) => {
        Origin.findById(originId).then((origin) => {
          if (!origin) {
            Promise.reject("Xuất sứ không tồn tại");
          }
        });
        return true;
      })
      .customSanitizer((originId) => {
        return mongoose.Types.ObjectId(originId);
      }),
    body("branch", "Nhãn hiệu không hợp lệ")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .escape()
      .if((branchId) => mongoose.Types.ObjectId.isValid(branchId))
      .custom((branchId) => {
        Branch.findById(branchId).then((branch) => {
          if (!branch) {
            Promise.reject("Nhãn hiệu không tồn tại");
          }
        });
        return true;
      })
      .customSanitizer((branchId) => {
        return mongoose.Types.ObjectId(branchId);
      })
  ),
  (req, res) => {
    const product = matchedData(req, {
      locations: ["body"],
    });
    Product.findOneAndUpdate({ _id: req.params.id }, product, {
      new: true,
    }).then((product) => {
      res.status(200).json({
        updated: product,
      });
    });
  },
];

exports.productDelete = [
  parallelValidate(
    param("id", "Id sản phẩm không hợp lệ")
      .if((id) => mongoose.Types.ObjectId.isValid(id))
      .custom((productId) => {
        if (!Product.exists(productId)) {
          throw new Error("Sản phẩm không tồn tại");
        }
        return true;
      })
  ),
  (req, res) => {
    Product.findOneAndDelete(req.params.id).then((product) => {
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
  ), (req, res) => {
    Product.findProductByName(req.query.keyword, products => {
      res.status(200)
        .json({
          products
        });
    });
  }
];
