module.exports = function(req, res, next) {
  if (!req.user) {
    res.status(400).json({
      state: "Fail",
      msg: "Chưa đăng nhập"
    });
    return
  }
  return next();
}