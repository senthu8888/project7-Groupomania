const express = require("express");
const router = express.Router();
const userController = require("../controllers/like");
const auth = require("../middleware/auth");

router.post("/", auth, userController.reactPost);

module.exports = router;
