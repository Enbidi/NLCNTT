const passport = require("passport");

const { body, validationResult } = require("express-validator");

const { parallelValidate } = require("../validate");

const { User } = require("../models/User");

module.exports.loginGet = (req, res) => {
  res.render("login");
};

module.exports.loginPost = [
  passport.authenticate("local", { failureUrl: "/login" }),
  (req, res) => {
    res.redirect("/homepage");
  },
];

module.exports.logoutGet = (req, res) => {
  req.logout();
};

module.exports.signupPost = [
  parallelValidate(
    body("firstname", "Họ không được để trống")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("lastname", "Tên không được trống")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .custom((value) => {
        return User.findUserByEmail(value).then((user) => {
          if (user) {
            return Promise.reject("Email đã được sử dụng");
          }
        });
      }),
    body("number", "Số điiện thoại không được để trống")
      .trim()
      .isLength({ min: 10, max: 10 })
      .escape(),
    body("email", "Email không hợp lệ").isEmail().normalizeEmail(),
    body("sex", "Giới tính không được để trống")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("password", "Mật khẩu không được để trống")
      .trim()
      .isLength({ min: 5 })
      .escape(),
    body("passwordConfirmation").custom((val, { req }) => {
      if (val != req.body.password) {
        throw new Error("Mật khẩu không khớp");
      }
      return true;
    })
  ),
  (req, res) => {
    const { firstname, lastname, number, email, password, sex } = req.body;
    User.register(
      {
        firstname,
        lastname,
        number,
        email,
        sex,
      },
      password
    );
  },
];
