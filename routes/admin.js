const router = require("express").Router();
const adminController = require("../controllers/admin");
const verifyUser = require("../middlewares/auth").verifyUser;

// router.post("/signup", adminController.postSignup);
router.post("/login", adminController.postLogin);
router.get("/records", verifyUser, adminController.getRecords);
router.get("/report", verifyUser, adminController.getReport);

module.exports = router;
