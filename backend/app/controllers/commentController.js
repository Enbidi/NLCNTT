const { parallelValidate } = require("../validate");

const {
  body,
  header,
  param,
  query,
  matchedData,
} = require("express-validator");

const commentService = require("../services/CommentService");
const productService = require("../services/ProductService");
const userService = require("../services/UserService");

const validateCommentParam = param("id", "Id bình luận không hợp lệ")
  .isMongoId()
  .bail()
  .custom(async (id) => {
    if (!(await commentService.isExist(id))) {
      throw new Error("Id nhãn hiệu không tồn tại");
    }
    return true;
  });

exports.commentsGet = [
  query("limit").default(20),
  async (req, res, next) => {
    commentService.fetchLimit({}, req.query.limit, (err, comments) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        comments,
      });
    });
  },
];

exports.addCommentPost = [
  parallelValidate(
    header("Content-Type").isIn("application/json"),
    body("content").trim().isLength({ min: 1 }).escape(),
    body("rating").isIn([1, 2, 3, 4, 5]),
    body("user")
      .isMongoId()
      .bail()
      .custom(async (userId) => {
        if (!(await userService.isExist(userId))) {
          throw new Error("Id người dùng không tồn tại");
        }
        return true;
      }),
    body("product")
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
    const comment = matchedData(req, { locations: ["body"] });
    commentService.createOne(comment, (err, product) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        created: comment,
      });
    });
  },
];

exports.commentPatch = [
  parallelValidate(
    header("Content-Type").isIn("application/json"),
    validateCommentParam,
    body("content").optional().trim().isLength({ min: 1 }).escape(),
    body("rating").optional().isIn([1, 2, 3, 4, 5]),
    body("user")
      .optional()
      .isMongoId()
      .bail()
      .custom(async (userId) => {
        if (!(await userService.isExist(userId))) {
          throw new Error("Id người dùng không tồn tại");
        }
        return true;
      }),
    body("product")
      .optional()
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
    const comment = matchedData(req, { locations: ["body"] });
    commentService.updateOne(
      { _id: req.params.id },
      comment,
      { new: true },
      (err, comment) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          updated: comment,
        });
      }
    );
  },
];

exports.commentDelete = [
  validateCommentParam,
  (req, res, next) => {
    commentService.removeOne({ _id: req.params.id }, (err, comment) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        deleted: comment,
      });
    });
  },
];

exports.findCommentByContent = [
  parallelValidate(
    query("keyword", "Nội dung không hợp lệ")
      .trim()
      .isLength({ min: 1 })
      .escape()
  ),
  (req, res, next) => {
    commentService.findByContent(req.query.keyword, (err, comments) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        comments,
      });
    });
  },
];
