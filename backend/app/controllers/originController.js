const mongoose = require("mongoose");

const { parallelValidate, sequentialValidate } = require("../validate");

const {
  body,
  header,
  param,
  query,
  matchedData,
} = require("express-validator");

const originService = require("../services/OriginService");

const validateOriginParam = param("id", "Id xuất sứ không hợp lệ")
  .isMongoId()
  .bail()
  .custom(async (originId) => {
    if (!(await originService.isExist(originId))) {
      throw new Error("Id xuất sứ không tồn tại");
    }
    return true;
  });

exports.originsGet = [
  query("limit").default(20).isNumeric().toFloat(),
  async (req, res) => {
    originService.fetchLimit({}, req.query.limit, (err, origins) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ items: origins });
    });
  },
];

exports.addOriginPost = [
  parallelValidate(
    header("Content-Type", "Invalid header").isIn(["application/json"]),
    body("country", "Quốc gia không được trống").trim().not().isEmpty().escape()
  ),
  (req, res) => {
    const origin = matchedData(req, { locations: ["body"] });
    originService.createOne(origin, (err, origin) => {
      res.status(200).json({
        created: origin,
      });
    });
  },
];

exports.updateOriginPost = [
  parallelValidate(
    header("Content-Type").isIn(["application/json"]),
    validateOriginParam,
    body("country").trim().not().isEmpty().escape()
  ),
  (req, res) => {
    const origin = matchedData(req, { locations: ["body"] });
    originService.updateOne(
      { _id: req.params.id },
      origin,
      { new: true },
      (err, origin) => {
        if (err) {
          next(err);
        }
        res.status(200).json({
          updated: origin,
        });
      }
    );
  },
];

exports.deleteOriginGet = [
  parallelValidate(
    header("Content-Type").isIn(["application/json"]),
    validateOriginParam
  ),
  (req, res) => {
    originService.removeOne({ _id: req.params.id }, (err, origin) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        deleted: origin,
      });
    });
  },
];

exports.deleteOrigins = [
  sequentialValidate(
    body("ids", "Xuất sử muốn xóa không được trống")
      .isArray()
      .custom((ids) => {
        for (let id of ids) {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Id không hợp lệ");
          }
          return true;
        }
      })
  ),
  (req, res) => {
    var ids = req.body.ids;
    originService.removeMany({ _id: ids }, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        state: "Success",
      });
    });
  },
];

exports.findOriginByNameGet = [
  parallelValidate(
    query("keyword", "Quốc gia xuất sứ không hợp lệ")
      .trim()
      .isLength({ min: 1 })
      .escape()
  ),
  (req, res, next) => {
    originService.findOriginByCountry(req.query.keyword, (err, origins) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        items: origins
      });
    });
  },
];
