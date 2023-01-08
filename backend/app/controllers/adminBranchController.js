const { Branch } = require("../models/Branch");

const { parallelValidate } = require("../validate");

const { body, header, param, query } = require("express-validator");

exports.branchesGet = (req, res) => {
  Branch.find().then(branches => {
    res.status(200).json({
      branches
    });
  });
}

exports.addBranchPost = [
  parallelValidate(
    header("Content-Type").custom((value) => {
      if (value !== "application/json") {
        throw new Error("Invalid header");
      }
      return true;
    }),
    body("name", "Tên nhãn hiệu không được trống")
      .trim()
      .isLength({ min: 1 })
      .escape()
  ),
  (req, res) => {
    Branch.create({
      name: req.body.name,
    }).then((branch) => {
      res.status(200).json({
        added: branch,
      });
    });
  },
];

exports.updateBranchPost = [
  parallelValidate([
    header("Content-Type", "Invalid header")
      .isIn(["application/json"]),
    param("id", "Id nhãn hiệu không hợp lệ")
      .if((id) => mongoose.Types.ObjectId.isValid(id))
      .custom((id) => {
        if (!Origin.exists(id)) {
          throw new Error("Id xuất sứ không tồn tại");
        }
        return true;
      }),
    body("branch.*").trim().isLength({ min: 1 }).escape(),
  ]),
  (req, res) => {
    const branch = Branch.findById(req.params.id);
    if (req.body.branch) {
      branch.name = req.body.name;
      origin.save((origin) => {
        res.status(200).json({
          updated: origin,
        });
      });
    }
  },
];

exports.deleteBranchGet = [
  parallelValidate(
    header("Content-Type")
      .isIn(["application/json"]),
    param("id", "Id nhãn hiệu không hợp lệ")
      .if((id) => mongoose.Types.ObjectId.isValid(id))
      .custom((id) => {
        if (!Branch.exists(id)) {
          throw new Error("Id nhãn hiệu không tồn tại");
        }
        return true;
      })
  ),
  (req, res) => {
    Origin.findOneAndRemove(req.params.id).then(branch => {
      res.status(200).json({
        deleted: origin,
      });
    });
  },
];

exports.findBranchByNameGet = [
  parallelValidate(
    query("keyword", "Tên nhãn hiệu không hợp lệ")
      .trim()
      .isLength({ min: 1 })
      .escape()
  ),
  (req, res) => {
    Branch.findBranchByName(req.query.keyword, branches => {
      res.status(200).json({
        branches,
      });
    });
  }
];
