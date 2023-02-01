const diskStorageConfig = {
  destination: (req, file, cb) => {
    cb(null, "public/uploads/images/");
  },
  filename(req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var parts = file.originalname.split(".");
    var filename = parts[parts.length - 2];
    var ext = parts[parts.length - 1];
    cb(null, `${filename}-${uniqueSuffix}.${ext}`);
  },
};

module.exports = {
  diskStorageConfig
};