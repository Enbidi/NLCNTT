modules.exports = function(req, res, next) {
  if (!req.use) {
    res.status(400).json({
      state: "Fail",
      msg: "Chưa đăng nhập"
    });
  }
  return next();
}