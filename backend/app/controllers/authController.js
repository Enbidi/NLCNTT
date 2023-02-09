const passport = require("passport");

const { body, validationResult, matchedData } = require("express-validator");

const { parallelValidate } = require("../validate");

const userService = require("../services/UserService");

var path = require('path');

const { User } = require("../models/User");

module.exports.loginGet = (req, res) => {
  res.sendFile(path.join(process.env.VIEW_DIR, 'static/login.html'));
};

module.exports.loginPost = [
  passport.authenticate("local", { failureUrl: "/login" }),
  (req, res) => {
    console.log(req.session)
    res.render('homepage');
  },
];

module.exports.logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};

module.exports.getAuthInfo = [
  (req, res) => {
    if (req.user) {
      res.status(200).json({
        item: req.user
      });
    } else {
      res.status(401).json({
        errors: ['Người dùng chưa đăng nhập']
      });
    }
  }
]

module.exports.signupGet = (req, res) => {
  res.sendFile(path.join(process.env.VIEW_DIR, 'static/signup.html'));
}

module.exports.signupPost = [
  parallelValidate(
    body("firstname", "Họ không được để trống")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("lastname", "Tên không được trống")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("number", "Số điiện thoại không được để trống")
      .trim()
      .isLength({ min: 10, max: 10 })
      .escape(),
    body("email", "Email không hợp lệ")
      .isEmail()
      .normalizeEmail()
      .custom(async email => {
        if (await userService.findUserByEmail(email)) {
          throw new Error("Email đã tồn tại");
        }
        return true;
      }),
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
  async (req, res, next) => {
    const { firstname, lastname, number, email, password, sex } = matchedData(req, 
      { locations: ["body"] });
    User.register(
      {
        firstname,
        lastname,
        number,
        email,
        sex,
      },
      password,
      (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          state: "Success"
        })
      }
    );
  },
];
