const express = require("express");
const router = express.Router();
const userController = require("../controllers/Message");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/message", auth, multer, userController.createMessage);
router.post("/react/:id", auth, userController.likeMessage);
router.get("/messages", auth, userController.getAllMessage);
router.delete("/messages/:id", auth, userController.deleteMessage);
router.get("/messages/:id", auth, userController.getOneMessage);
router.put("/messages/:id", auth, multer, userController.updateOneMessage);

module.exports = router;
