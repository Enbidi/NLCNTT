const { parallelValidate, sequentialValidate } = require("../validate");

const {
  body,
  header,
  param,
  query,
  matchedData,
} = require("express-validator");

const branchService = require("../services/BranchService");
const { default: mongoose } = require("mongoose");

exports.getSize = (req, res) => {
  branchService.size((err, size) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(size);
  })
}

exports.branchesGet = [
  query("limit").default(20),
  async (req, res) => {
    branchService.fetchLimit({}, req.query.limit, (err, branches) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        items: branches,
      });
    });
  },
];

exports.productsPerBranchGet = [
  (req, res) => {
    branchService.fetchProductsPerBranch({}, (err, branches) => {
      if (err) {
        return next(err);
      }
      res.status(200)
        .json({
          items: branches
      });
    })
  }
];

exports.addBranchPost = [
  parallelValidate(
    header("Content-Type").isIn(["application/json"]),
    body("name", "Tên nhãn hiệu không được trống")
      .trim()
      .isLength({ min: 1 })
      .escape()
  ),
  (req, res) => {
    const branch = matchedData(req, { locations: ["body"] });
    branchService.createOne(branch, (err, branch) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        created: branch,
      });
    });
  },
];

exports.branchPatch = [
  parallelValidate(
    header("Content-Type", "Invalid header").isIn(["application/json"]),
    param("id", "Id nhãn hiệu không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (branchId) => {
        if (!(await branchService.isExist(branchId))) {
          throw new Error("Id nhãn hiệu không tồn tại");
        }
        return true;
      }),
    body("name").optional().trim().not().isEmpty().escape(),
  ),
  (req, res) => {
    const branch = matchedData(req, { locaions: ["body"] })
    branchService.updateOne(
      { _id: req.params.id },
      branch,
      { new: true },
      (err, branch) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          updated: branch,
        });
      }
    );
  },
];

exports.deleteBranchGet = [
  parallelValidate(
    param("id", "Id nhãn hiệu không hợp lệ")
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
    branchService.removeOne({ _id: req.params.id }, (err, branch) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        deleted: branch,
      });
    });
  },
];

exports.deleteBranches = [
  sequentialValidate(
    body("ids", "Nhãn hiệu muốn xóa không được trống")
      .isArray()
      .custom(ids => {
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
    branchService.removeMany({ _id: ids }, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        state: "Success"
      });
    });
  }
]

exports.findBranchByNameGet = [
  query("keyword", "Tên nhãn hiệu không hợp lệ")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res) => {
    branchService.findBranchByName(req.query.keyword, (err, branches) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        items: branches,
      });
    });
  },
];
