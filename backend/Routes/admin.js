const express = require("express");
const router = express.Router();
const userController = require("../controllers/admin");
const admin = require("../middleware/admin");

router.get("/messages/", admin, userController.getAllMessageAdmin);
router.get("/users/", admin, userController.getAllUsersAdmin);

module.exports = router;
