const { checkSchema } = require("express-validator");
const mongoose = require("mongoose");
const productService = require("../services/ProductService");
const branchService = require("../services/BranchService");
const originService = require("../services/OriginService");

const productSchema = {
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
  origin: {
    isMongoId: {
      errorMessage: "Xuất sứ không hợp lệ"
    },
    custom: {
      options: async (originId) => {
        if (!(await originService.isExist(originId))) {
          throw new Error("ID xuất sứ không tồn tại");
        }
        return true;
      },
      bail: true
    }
  },
  branch: {
    isMongoId: {
      errorMessage: "Nhãn hiệu không hợp lệ"
    },
    custom: {
      options: async (branchId) => {
        if (!(await branchService.isExist(branchId))) {
          throw new Error("ID nhãn hiệu không tồn tại");
        }
        return true;
      },
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
  RAM: {
    isInt: true,
    errorMessage: "Thông số RAM không hợp lệ"
  },
  diskSize: {
    isInt: true,
    errorMessage: "Thông số dung lượng bộ nhớ không hợp lệ"
  }
};

const productUpdationSchema = {
  id: {
    isMongoId: true,
    custom: {
      options: async (productId) => {
        if (!(await productService.isExist(productId))) {
          throw new Error("Sản phẩm không tồn tại");
        }
        return true;
      },
      bail: true
    }
  },
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
    },
    optional: true
  },
  origin: {
    isMongoId: {
      errorMessage: "Xuất sứ không hợp lệ"
    },
    custom: {
      options: async (originId) => {
        if (!(await originService.isExist(originId))) {
          throw new Error("ID xuất sứ không tồn tại");
        }
        return true;
      },
      bail: true
    },
    optional: true
  },
  branch: {
    isMongoId: {
      errorMessage: "Nhãn hiệu không hợp lệ"
    },
    custom: {
      options: async (branchId) => {
        if (!(await branchService.isExist(branchId))) {
          throw new Error("ID nhãn hiệu không tồn tại");
        }
        return true;
      },
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
  productSchema,
  productUpdationSchema
};