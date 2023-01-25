exports.getAuthInfo = (req, res) => {
  if (req.session.passport) {
    res.status(200).json({
      ...req.session.passport
    });
  } else {
    res.status(200).json({
      errors: ['Người dùng chưa đăng nhập']
    });
  }
}