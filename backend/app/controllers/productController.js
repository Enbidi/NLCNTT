const productService = require("../services/ProductService");
const originService = require("../services/OriginService");
const branchService = require("../services/BranchService");
const { default: mongoose } = require("mongoose");

const upload = require("../middlewares/multer.middleware");

const {
  parallelValidate,
  sequentialValidate,
  validateSchema,
  validate
} = require("../middlewares/express-validator.middleware");
const { creationSchema, updationSchema, productParamExistenceSchema } = require("../configs/express-validator/schemas/product.schema");

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

const customOriginValidation = async (originId) => {
  if (!(await originService.isExist(originId))) {
    throw new Error("Id xuất sứ không tồn tại");
  }
  return true;
};

const customBranchValidation = async (branchId) => {
  if (!(await branchService.isExist(branchId))) {
    throw new Error("Id nhãn hiệu không tồn tại");
  }
  return true;
};

exports.topPurchasedProducts = [
  validate(
    query("top").isNumeric()
  ),
  (req, res, next) => {
    var top = req.query.top;
    productService.getTopPurchasedProducts(top, (err, products) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        items: products
      });
    })
  }
]

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
  validateProductParam,
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
    // const productData = matchedData(req, { locations: ["body"] });
    const product = {
      name: req.body.name,
      price: req.body.price,
      img: req.body.img,
      description: req.body.description,
      origin: req.body.origin,
      branch: req.body.branch,
      specs: {
        screen: req.body.screen,
        os: req.body.os,
        frontCamera: req.body.frontCamera,
        backCamera: req.body.backCamera,
        chip: req.body.chip,
        SIMs: req.body.sims,
        charging: req.body.charging,
        RAM: req.body.ram,
        diskSize: req.body.diskSize,
      },
    };
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
  validateSchema(updationSchema),
  (req, res) => {
    // const product = matchedData(req, {
    //   locations: ["body"],
    // });
    const product = {
      name: req.body.name,
      price: req.body.price,
      img: req.body.img,
      description: req.body.description,
      origin: req.body.origin,
      branch: req.body.branch,
      specs: {
        screen: req.body.screen,
        os: req.body.os,
        frontCamera: req.body.frontCamera,
        backCamera: req.body.backCamera,
        chip: req.body.chip,
        SIMs: req.body.sims,
        charging: req.body.charging,
        RAM: req.body.ram,
        diskSize: req.body.diskSize,
      },
    };
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
    productService.findProductByName(req.query.keyword, (err, products) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        items: products,
        keyword: req.query.keyword,
      });
    });
  },
];
