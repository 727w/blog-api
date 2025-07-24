const express = require("express");
const router = express.Router();
const {
  showAllPost,
  createPost,
  searchPostByTitle,
  getPostDetail,
  getAllComments,
  createComment,
} = require("../controller/postController");
const imageUpload = require("../middleware/upload");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get("/api/post/all", showAllPost);
router.get("/api/post/:title", searchPostByTitle);
router.get("/api/post/detail/:id", getPostDetail);
router.get("/api/post/detail/:id/comments", getAllComments);
router.post(
  "/api/post/new",
  imageUpload.single("image"),
  authenticateJWT,
  createPost
);
router.post("/api/post/:postId/comment", authenticateJWT, createComment);

module.exports = router;

