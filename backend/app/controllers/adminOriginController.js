const mongoose = require("mongoose");
const { Origin } = require("../models/Origin");

const { parallelValidate } = require("../validate");

const { body, header, param, query } = require("express-validator");

exports.originsGet = (req, res) => {
  Origin.find().then((origins) => {
    res.status(200).json({origins});
  });
};

exports.addOriginPost = [
  parallelValidate(
    header("Content-Type", "Invalid header").isIn(["application/json"]),
    body("country", "Quốc gia không được trống")
      .trim()
      .isLength({ min: 1 })
      .escape()
  ),
  (req, res) => {
    Origin.create({
      country: req.body.country,
    }).then((origin) => {
      res.status(200).json({
        added: origin,
      });
    });
  },
];

exports.updateOriginPost = [
  parallelValidate(
    header("Content-Type").custom((value) => {
      if (value !== "application/json") {
        throw new Error("Invalid header");
      }
      return true;
    }),
    param("id", "Id xuất sứ không hợp lệ")
      .if((id) => mongoose.Types.ObjectId.isValid(id))
      .custom((id) => {
        if (!Origin.exists(id)) {
          throw new Error("Id xuất sứ không tồn tại");
        }
        return true;
      }),
    body("origin.*").trim().isLength({ min: 1 }).escape()
  ),
  (req, res) => {
    const origin = Origin.findById(req.params.id);
    if (req.body.origin) {
      origin.name = req.body.origin.name;
      origin.save((origin) => {
        res.status(200).json({
          updated: origin,
        });
      });
    }
  },
];

exports.deleteOriginGet = [
  parallelValidate(
    header("Content-Type").custom((value) => {
      if (value !== "application/json") {
        throw new Error("Invalid header");
      }
      return true;
    }),
    param("id", "Id xuất sứ không hợp lệ")
      .if((id) => mongoose.Types.ObjectId.isValid(id))
      .custom((id) => {
        if (!Origin.exists(id)) {
          throw new Error("Id xuất sứ không tồn tại");
        }
        return true;
      })
  ),
  (req, res) => {
    Origin.findOneAndRemove(req.params.id).then((origin) => {
      res.status(200).json({
        deleted: origin,
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
  ), (req, res) => {
    Origin.findOriginByCountry(req.query.keyword, origins => {
      res.status(200)
        .json({
          origins
        });
    });
  }
];
