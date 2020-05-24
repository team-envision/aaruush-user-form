const router = require("express").Router();
const messageController = require("../controllers/message");
const tempUpload = require("../middlewares/multer").tempUpload;

router.post("/upload", tempUpload, messageController.postUpload);

module.exports = router;
