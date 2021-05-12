const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", auth, userController.getOneUser);
router.get("/users", admin, userController.getAllUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.delete("/:id", auth, userController.deleteOneUser);
router.put("/:id", auth, userController.updateOneUser);

module.exports = router;
