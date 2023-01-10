const { parallelValidate } = require("../validate");

const {
  body,
  header,
  param,
  query,
  matchedData,
} = require("express-validator");

const saleService = require("../services/SaleService");

exports.salesGet = [
  query("limit").default(20),
  async (req, res, next) => {
    saleService.fetchLimit(req.query.limit, (err, sales) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        sales,
      });
    });
  },
];

exports.addSalePost = [
  parallelValidate(
    header("Content-Type").isIn("application/json"),
    body("start", "Ngày bắt đầu không hợp lệ").isISO8601().bail().toDate(),
    body("end", "Ngày kết thúc không hợp lệ").isISO8601().bail().toDate()
  ),
  (req, res, next) => {
    const sale = matchedData(req, { locations: ["body"] });
    saleService.createOne(sale, (err, sale) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        created: sale,
      });
    });
  },
];

exports.salePatch = [
  parallelValidate(
    header("Content-Type").isIn("application/json"),
    param("id", "Id khuyến mãi không hợp lệ").isMongoId(),
    body("start", "Ngày bắt đầu không hợp lệ")
      .optional()
      .isDate()
      .bail()
      .toDate(),
    body("end", "Ngày kết thúc không hợp lệ")
      .optional()
      .isDate()
      .bail()
      .toDate()
  ),
  (req, res, next) => {
    const sale = matchedData(req, { locations: ["body"] });
    saleService.updateOne({ _id: req.params.id }, sale, { new: true }, (err, sale) => {
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
    saleService.deleteOne({ _id: req.params.id }, (err, sale) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        deleted: sale,
      });
    });
  },
];

// exports.findCommentByContent = [
//   parallelValidate(
//     query("keyword", "Nội dung không hợp lệ")
//       .trim()
//       .isLength({ min: 1 })
//       .escape()
//   ),
//   (req, res, next) => {
//     commentService.findByContent(req.query.keyword, (err, comments) => {
//       if (err) {
//         return next(err);
//       }
//       res.status(200).json({
//         comments,
//       });
//     });
//   },
// ];
