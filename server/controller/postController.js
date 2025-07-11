const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

async function createPost(req, res) {
  const { title, content } = req.body;
  const user = req.user;
  const imageFile = req.file;

  const imagePath = Date.now() + path.extname(imageFile.originalname);

  if (!title || !content) {
    return res.status(400).json({ error: "Fields can't be empty" });
  }
  if (!imageFile) {
    return res.status(400).json({ error: "Image file is required" });
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
        cover_path: imagePath,
      },
    });
    res.redirect("/");
  } catch (error) {
    throw new Error("error wkwkw");
  }
}

module.exports = {
  createPost,
};
