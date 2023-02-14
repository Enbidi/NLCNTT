const productService = require("../services/ProductService");
const originService = require("../services/OriginService");
const branchService = require("../services/BranchService");
const { default: mongoose } = require("mongoose");

const upload = require("../middlewares/multer.middleware");

const {
  parallelValidate,
  sequentialValidate,
  validateSchema,
  validate,
} = require("../middlewares/express-validator.middleware");
const {
  creationSchema,
  updationSchema,
  productParamExistenceSchema,
} = require("../configs/express-validator/schemas/product.schema");

const {
  body,
  param,
  header,
  matchedData,
  query,
} = require("express-validator");

const validateProductParam = param("id", "ID sản phẩm không hợp lệ")
  .isMongoId()
  .bail()
  .custom(async (productId) => {
    if (!(await productService.isExist(productId))) {
      throw new Error("Id sản phẩm không tồn tại");
    }
    return true;
  });

exports.getSize = (req, res, next) => {
  productService.size((err, size) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(size);
  });
};

exports.topPurchasedProducts = [
  validate(query("top").isNumeric()),
  (req, res, next) => {
    var top = req.query.top;
    productService.getTopPurchasedProducts(top, (err, products) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        items: products,
      });
    });
  },
];

exports.productsGet = [
  query("limit").default(20).isNumeric().toFloat(),
  async (req, res, next) => {
    productService.fetchLimitWithOriginAndBranch(
      {},
      req.query.limit,
      (err, products) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ items: products });
      }
    );
  },
];

exports.productGetById = [
  validateSchema(productParamExistenceSchema),
  (req, res, next) => {
    productService.findOne({ _id: req.params.id }, (err, product) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        item: product,
      });
    });
  },
];

exports.getComments = [
  // validateProductParam,
  validateSchema(productParamExistenceSchema),
  (req, res) => {
    productService.fetchComments({ _id: req.params.id }, (err, product) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        items: product.comments,
      });
    });
  },
];

exports.addProductPost = [
  upload.single("img"),
  validateSchema(creationSchema),
  (req, res) => {
    const product = matchedData(req, { locations: ["body"] });
    productService.createProduct(product, (err, product) => {
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
  upload.single("img"),
  validateSchema(updationSchema),
  (req, res) => {
    var product = matchedData(req, { locations: ["body"] });
    productService.updateProduct(req.params.id, product, (err, product) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        updated: product,
      });
    });
  },
];

exports.productDelete = [
  // validateProductParam,
  validateSchema(productParamExistenceSchema),
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

exports.deleteProducts = [
  sequentialValidate(
    body("ids", "Sản phẩm muốn xóa không được trống")
      .isArray()
      .not()
      .isEmpty()
      .custom((ids) => {
        for (let id of ids) {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Id không hợp lệ");
          }
        }
        return true;
      })
  ),
  (req, res) => {
    var ids = req.body.ids;
    productService.removeMany({ _id: ids }, (err, deletedProducts) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        deleted: deletedProducts,
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
  (req, res, next) => {
    var keyword = req.query.keyword;
    productService.fetchLimitWithOriginAndBranch(
      {
        name: {
          $regex: `.*${keyword}.*`,
        },
      },
      10,
      (err, products) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          items: products,
          keyword: req.query.keyword,
        });
      }
    );
    // productService.findProductByName(req.query.keyword, (err, products) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.status(200).json({
    //     items: products,
    //     keyword: req.query.keyword,
    //   });
    // });
  },
];
