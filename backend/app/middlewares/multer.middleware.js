const multer = require("multer");
const { diskStorageConfig } = require("../configs/multer.config");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/images/");
  },
  filename(req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var parts = file.originalname.split(".");
    var filename = parts[parts.length - 2];
    var ext = parts[parts.length - 1];
    cb(null, `${filename}-${uniqueSuffix}.${ext}`);
  }
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("image")) {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
  storage,
});

module.exports = upload;