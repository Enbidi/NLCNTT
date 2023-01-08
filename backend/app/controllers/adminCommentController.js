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

exports.commentsGet = [
  query("limit").default(20),
  async (req, res) => {
    commentService.fetchLimit(req.query.limit, (comments) => {
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
        return await commentService.isExist(userId);
      }),
    body("product")
      .isMongoId()
      .bail()
      .custom(async (productId) => {
        return await productService.isExist(productId);
      })
  ),
  (req, res) => {
    const comment = matchedData(req, { locations: ["body"] });
    commentService.createOne(comment, (product) => {
      res.status(200).json({
        created: comment,
      });
    });
  },
];

exports.commentPatch = [
  parallelValidate(
    header("Content-Type").isIn("application/json"),
    param("id", "Id bình luận không hợp lệ")
      .trim()
      .isLength({ min: 1 })
      .escape(),
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
  (req, res) => {
    const comment = matchedData(req, { locations: ["body"] });
    commentService.updateOne(
      req.params.id,
      comment,
      { new: true },
      (comment) => {
        res.status(200).json({
          updated: comment,
        });
      }
    );
  },
];

exports.commentDelete = [
  parallelValidate(
    param("id", "Id bình luận không hợp lệ")
      .isMongoId()
      .bail()
      .custom(async (id) => {
        if (!(await commentService.isExist(id))) {
          throw new Error("Id nhãn hiệu không tồn tại");
        }
        return true;
      })
  ),
  (req, res) => {
    commentService.deleteOne(req.params.id, (comment) => {
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
  (req, res) => {
    commentService.findByContent(req.query.keyword, comments => {
      res.status(200).json({
        comments,
      });
    });
  },
];
