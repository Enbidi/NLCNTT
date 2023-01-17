const { User, Staff, Admin, Customer } = require("../models/User");

const { parallelValidate } = require("../validate");

const mongoose = require("mongoose");

const {
  body,
  header,
  param,
  query,
  matchedData,
} = require("express-validator");

function getValidationChains(optionals) {
  const chains = [];
  chains.push(header("Content-Type").isIn(["application/json"]));
  chains.push(
    optionals.firstname
      ? body("firstname").optional().trim().isLength({ min: 1 }).escape()
      : body("firstname").trim().isLength({ min: 1 }).escape()
  );
  chains.push(
    optionals.lastname
      ? body("lastname").optional().trim().isLength({ min: 1 }).escape()
      : body("lastname").trim().isLength({ min: 1 }).escape()
  );
  chains.push(
    optionals.number
      ? body("number", "Số điiện thoại không được để trống")
          .optional()
          .trim()
          .isLength({ min: 10, max: 10 })
          .escape()
      : body("number", "Số điiện thoại không được để trống")
          .trim()
          .isLength({ min: 10, max: 10 })
          .escape()
  );
  chains.push(
    optionals.email
      ? body("email", "Email không hợp lệ")
          .optional()
          .isEmail()
          .normalizeEmail()
      : body("email", "Email không hợp lệ").isEmail().normalizeEmail()
  );
  chains.push(
    optionals.sex
      ? body("sex", "Giới tính không được để trống")
          .optional()
          .isIn(["Male", "Female"])
      : body("sex", "Giới tính không được để trống").isIn(["Male", "Female"])
  );
  chains.push(
    optionals.password
      ? body("password", "Mật khẩu không được để trống")
          .optional()
          .trim()
          .isLength({ min: 5 })
          .escape()
      : body("password", "Mật khẩu không được để trống")
          .trim()
          .isLength({ min: 5 })
          .escape()
  );
  chains.push(
    optionals.role
      ? body("role", "Xác định vai trò của người dụng được tạo")
          .optional()
          .isIn(["admin", "staff", "customer"])
      : body("role", "Xác định vai trò của người dụng được tạo").isIn([
          "admin",
          "staff",
          "customer",
        ])
  );
}

exports.usersGet = async (req, res) => {
  User.find().then((users) => {
    res.status(200).json({ items: users });
  });
};

exports.addUserPost = [
  parallelValidate(
    header("Content-Type").isIn(["application/json"]),
    body("firstname").trim().isLength({ min: 1 }).escape(),
    body("lastname").trim().isLength({ min: 1 }).escape(),
    body("number", "Số điện thoại không được để trống")
      .trim()
      .isLength({ min: 10, max: 10 })
      .escape(),
    body("email", "Email không hợp lệ").isEmail().normalizeEmail(),
    body("sex", "Giới tính không được để trống").isIn(["Male", "Female"]),
    body("password", "Mật khẩu không được để trống")
      .trim()
      .isLength({ min: 5 })
      .escape(),
    body("role", "Xác định vai trò của người dụng được tạo").isIn([
      "admin",
      "staff",
      "customer",
    ])
  ),
  (req, res) => {
    const userInfo = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      number: req.body.number,
      email: req.body.email,
      sex: req.body.sex,
    };
    switch (req.body.role) {
      case "customer":
        Customer.register(userInfo, req.body.password).then((customer) => {
          res.status(200).json({
            added: customer,
          });
        });
        break;
      case "staff":
        Staff.register(userInfo, req.body.password).then((staff) => {
          res.status(200).json({
            added: staff,
          });
        });
        break;
      case "admin":
        Admin.register(userInfo, req.body.password).then((admin) => {
          res.status(200).json({
            added: admin,
          });
        });
        break;
    }
  },
];

exports.userPatch = [
  parallelValidate(
    header("Content-Type").isIn(["application/json"]),
    param("id", "Mã người dùng không hợp lệ")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .if((userId) => mongoose.Types.ObjectId.isValid(userId))
      .custom(async (userId) => {
        if (!(await User.exists({ _id: userId }))) {
          throw new Error("Người dùng không tồn tại");
        }
        return true;
      }),
    body("firstname").optional().trim().isLength({ min: 1 }).escape(),
    body("lastname").optional().trim().isLength({ min: 1 }).escape(),
    body("number", "Số điện thoại không được để trống")
      .optional()
      .trim()
      .isLength({ min: 10, max: 10 })
      .escape(),
    body("email", "Email không hợp lệ").optional().isEmail().normalizeEmail(),
    body("sex", "Giới tính không được để trống")
      .optional()
      .isIn(["Male", "Female"]),
    body("password", "Mật khẩu không được để trống")
      .optional()
      .trim()
      .isLength({ min: 5 })
      .escape(),
    body("role", "Xác định vai trò của người dụng được tạo")
      .optional()
      .isIn(["admin", "staff", "customer"])
  ),
  (req, res) => {
    const user = matchedData(req, { locations: ["body"] });
    User.findOneAndUpdate({ _id: req.params.id }, user, { new: true }).then(
      (user) => {
        res.status(200).json({
          updated: user,
        });
      }
    );
  },
];

exports.userDelete = [
  parallelValidate(
    param("id")
      .isMongoId()
      .bail()
      .custom(async (userId) => {
        if (!(await User.exists({ _id: userId }))) {
          throw new Error("Người dùng muốn xóa không tồn tại");
        }
        return true;
      })
  ),
  (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }).then((user) => {
      res.status(200).json({
        deleted: user,
      });
    });
  },
];

exports.findUserByNameGet = [
  parallelValidate(
    query("keyword", "Id người dùng không hợp lệ")
      .trim()
      .isLength({ min: 1 })
      .escape()
  ),
  (req, res) => {
    User.findUserByFullname(req.query.keyword, (users) => {
      res.status(200).json({
        users
      });
    });
  },
];
