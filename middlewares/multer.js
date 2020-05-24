const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

const storageOptions = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     const dir = path.join(__basedir, "tempData");
  //     cb(null, dir);
  //   },
  filename: function (req, file, cb) {
    const name = uuid.v4() + "-" + file.originalname;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const filter = ["image/png", "image/jpeg", "video/x-msvideo", "video/mp4"];
  if (filter.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported Media Type."), false);
  }
};

const limits = {
  files: 1,
  fileSize: 10 * 1024 * 1024,
};

const upload = multer({
  storage: storageOptions,
  fileFilter: fileFilter,
  limits: limits,
}).single("attachment");

exports.tempUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.message === "Unsupported Media Type.") {
        res.status(415).json({
          status: "ERROR",
          error: err.message,
        });
      } else if (err.code === "LIMIT_FILE_COUNT") {
        res.status(415).json({
          status: "ERROR",
          error: "Too many files.",
        });
      } else if (err.code === "LIMIT_FILE_SIZE") {
        res.status(415).json({
          status: "ERROR",
          error: "File too large.",
        });
      } else {
        console.log(err);
        res.status(500).json({
          status: "ERROR",
          error: "Internal Server Error.",
        });
      }
    } else {
      return next();
    }
  });
};
