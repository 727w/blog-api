const express = require("express");
const router = express.Router();
const { createPost } = require("../controller/postController");
const imageUpload = require("../middleware/upload");

router.post("/new/post", imageUpload.single("image"), createPost);

module.exports = router;
