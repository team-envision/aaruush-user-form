const router = require("express").Router();
const messageController = require("../controllers/message");
const tempUpload = require("../middlewares/multer").tempUpload;
const recaptchaVerify = require("../middlewares/recaptcha").captchaVerify;

router.post(
  "/upload",
  tempUpload,
  recaptchaVerify,
  messageController.postUpload
);

module.exports = router;
