const express = require("express");
const router = express.Router();
const userController = require("../controllers/Comment");
const auth = require("../middleware/auth");

router.post("/comments", auth, userController.createComment);
router.get("/comments/:id", auth, userController.getOneComment);
router.get("/comments", auth, userController.getAllComments);
router.put("/comments/:id", auth, userController.updateOneComment);
router.delete("/comments/:id", auth, userController.deleteComment);

module.exports = router;
