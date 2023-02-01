const productService = require("../../../services/ProductService");
const branchService = require("../../../services/BranchService");
const originService = require("../../../services/OriginService");
const { default: mongoose } = require("mongoose");

const productChecker = async (productId) => {
  if (!(await productService.exists(productId))) {
    throw new Error("Sản phẩm không tồn tại");
  }
  return true;
}

const originChecker = async (originId) => {
  if (!(await originService.exists(originId))) {
    throw new Error("Xuất sứ không tồn tại");
  }
  return true;
}

const branchChecker = async (branchId) => {
  if (!(await branchService.exists(branchId))) {
    throw new Error("Nhãn hiệu không tồn tại");
  }
  return true;
}

const getImgPath = (img, { req }) => {
  // remove public/
  return req.file
    ? req.file.destination.substr(6) + req.file.filename
    : undefined;
}

const productParamExistenceSchema = {
  id: {
    in: ['params'],
    isMongoId: true,
    errorMessage: "Sản phẩm không hợp lệ",
    custom: {
      options: productChecker,
      bail: true
    }
  }
};

const productsBodyExistenceSchema = {
  in: ['body'],
  errorMessage: "Sản phẩm muốn xóa không được trống",
  isArray: true,
  notEmpty: {
    errorMessage: "Sản phẩm muốn xóa không được trống"
  },
  custom: {
    options: (ids) => {
      for (let id of ids) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error("Sản phẩm không hợp lệ");
        }
      }
      return true;
    },
    bail: true
  }
}

/**
 * Old style:
 * 
 * parallelValidate(
      // header("Content-Type").isIn(["application/json"]),
      body("name", "Tên không được trống").trim().isLength({ min: 1 }).escape(),
      body("price", "Giá không được trống").isNumeric().toFloat(),
      body("img").customSanitizer((img, { req }) => {
        // remove public/
        return req.file
          ? req.file.destination.substr(6) + req.file.filename
          : undefined;
      }),
      body("description", "Mô tả không được trống")
        .trim()
        .isLength({ min: 1 })
        .escape(),
      body("origin", "Xuất sứ không hợp lệ")
        .isMongoId()
        .bail()
        .custom(customOriginValidation),
      body("branch", "Nhãn hiệu không hợp lệ")
        .isMongoId()
        .bail()
        .custom(customBranchValidation),
      body(
        ["screen", "os", "backCamera", "frontCamera", "chip", "sims", "charging"],
        "Thông số kĩ thuật không hợp lệ"
      )
        .not()
        .isEmpty()
        .escape(),
      body(["ram", "diskSize"], "Thông số kĩ thuật không hợp lệ")
        .isNumeric()
        .toInt()
    ),
 */
const creationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Tên sản phẩm phải ít nhất 2 kí tự",
    }
  },
  price: {
    errorMessage: "Giá không hợp lệ",
    isInt: true
  },
  description: {
    notEmpty: {
      errorMessage: "Mô tả không được trống",
    }
  },
  img: {
    customSanitizer: {
      options: getImgPath
    }
  },
  origin: {
    isMongoId: {
      errorMessage: "Xuất sứ không hợp lệ"
    },
    custom: {
      options: originChecker,
      bail: true
    }
  },
  branch: {
    isMongoId: {
      errorMessage: "Nhãn hiệu không hợp lệ"
    },
    custom: {
      options: branchChecker,
      bail: true
    }
  },
  screen: {
    notEmpty: {
      errorMessage: "Thông số màn hình không được trống"
    }
  },
  os : {
    notEmpty: {
      errorMessage: "Hệ điều hành không được trống"
    }
  },
  backCamera : {
    notEmpty: {
      errorMessage: "Thông số camera sau đang trống"
    }
  },
  frontCamera: {
    notEmpty: {
      errorMessage: "Thông số camera trước đang trống"
    }
  },
  chip : {
    notEmpty: {
      errorMessage: "Thông số chip không được trống"
    }
  },
  sims : {
    notEmpty: {
      errorMessage: "Thông số sim đang trống"
    }
  },
  charging : {
    notEmpty: {
      errorMessage: "Thông số sạc không được trống"
    }
  },
  ram: {
    isInt: true,
    errorMessage: "Thông số RAM không hợp lệ"
  },
  diskSize: {
    isInt: true,
    errorMessage: "Thông số dung lượng bộ nhớ không hợp lệ"
  }
};

/**
 * Old style:
 * parallelValidate(
    header("Content-Type").isIn(["application/json"]),
    validateProductParam,
    body("name", "Tên sản phẩm không hợp lệ")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("price", "Giá sản phẩm không hợp lệ").optional().isNumeric().toFloat(),
    body("img").optional(),
    body("description", "Mô tả sản phẩm không hợp lệ")
      .optional()
      .trim()
      .escape()
      .not()
      .isEmpty(),
    body("origin", "Xuất sứ không hợp lệ")
      .optional()
      .isMongoId()
      .bail()
      .custom(customOriginValidation),
    body("branch", "Nhãn hiệu không hợp lệ")
      .optional()
      .isMongoId()
      .bail()
      .custom(customBranchValidation),
    body(
      ["screen", "os", "backCamera", "frontCamera", "chip", "sims", "charging"],
      "Thông số kĩ thuật không hợp lệ"
    )
      .optional()
      .not()
      .isEmpty()
      .escape(),
    body(["ram", "diskSize"], "Thông số kĩ thuật không hợp lệ")
      .optional()
      .isNumeric()
      .toInt()
  )
 */
// var t = Object.fromEntries(
//   Object.entries(creationSchema)
//     .map(el => [el[0], { ...el[1], optional: true}]));
const updationSchema = {
  id: productParamExistenceSchema,
  name: {
    notEmpty: {
      errorMessage: "Tên sản phẩm phải ít nhất 2 kí tự",
    },
    optional: true
  },
  price: {
    errorMessage: "Giá không hợp lệ",
    isInt: true,
    optional: true
  },
  description: {
    notEmpty: {
      errorMessage: "Mô tả không được trống",
      optional: true
    },
    optional: true
  },
  img: {
    customSanitizer: {
      options: getImgPath
    }
  },
  origin: {
    isMongoId: {
      errorMessage: "Xuất sứ không hợp lệ"
    },
    custom: {
      options: originChecker,
      bail: true
    },
    optional: true
  },
  branch: {
    isMongoId: {
      errorMessage: "Nhãn hiệu không hợp lệ"
    },
    custom: {
      options: branchChecker,
      bail: true
    },
    optional: true
  },
  screen: {
    notEmpty: {
      errorMessage: "Thông số màn hình không được trống"
    },
    optional: true
  },
  os : {
    notEmpty: {
      errorMessage: "Hệ điều hành không được trống"
    },
    optional: true
  },
  backCamera : {
    notEmpty: {
      errorMessage: "Thông số camera sau đang trống"
    },
    optional: true
  },
  frontCamera: {
    notEmpty: {
      errorMessage: "Thông số camera trước đang trống"
    },
    optional: true
  },
  chip : {
    notEmpty: {
      errorMessage: "Thông số chip không được trống"
    },
    optional: true
  },
  sims : {
    notEmpty: {
      errorMessage: "Thông số sim đang trống"
    },
    optional: true
  },
  charging : {
    notEmpty: {
      errorMessage: "Thông số sạc không được trống"
    },
    optional: true
  },
  RAM: {
    isInt: true,
    errorMessage: "Thông số RAM không hợp lệ",
    optional: true
  },
  diskSize: {
    isInt: true,
    errorMessage: "Thông số dung lượng bộ nhớ không hợp lệ",
    optional: true
  }
}

module.exports = {
  creationSchema,
  updationSchema,
  productParamExistenceSchema
};