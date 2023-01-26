const express = require("express");
const router = express.Router();

const commentController = require("../../controllers/commentController");

router.get("/", commentController.commentsGet);

router.post("/add", commentController.addCommentPost);

router.patch("/:id/update", commentController.commentPatch);

router.delete("/:id/delete", commentController.commentDelete);

router.get("/find", commentController.findCommentByContent);

module.exports = router;