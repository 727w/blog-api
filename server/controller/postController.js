const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

async function showAllPost(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!posts || posts.length === 0) {
      res.status(404).json({ error: "There is no post yet" });
    }

    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get post", details: error.message });
  }
}

async function createPost(req, res) {
  const { title, content } = req.body;
  const { userId } = req.user;
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
        authorId: userId,
        cover_path: imagePath,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create post", details: error.message });
  }
}

async function searchPostByTitle(req, res) {
  const { title } = req.params;
  try {
    const post = await prisma.post.findMany({
      where: {
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
    });

    if (post === 0) {
      res.status(404).json({ error: `Couldn't find ${title}` });
    }

    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search post", details: error.message });
  }
}

async function getPostDetail(req, res) {
  const { id } = req.params;
  try {
    const postDetail = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (postDetail === null) {
      res
        .status(404)
        .json({ error: "Could not find the post detail you were looking for" });
    }

    res.json(postDetail);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get post detail", details: error.message });
  }
}

async function createComment(req, res) {
  const { content } = req.body;
  const { userId } = req.user;
  const { postId } = req.params;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        userId: Number(userId),
        postId: Number(postId),
      },
    });

    res.json(comment);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get create a comment",
      details: error.message,
    });
  }
}

async function getAllComments(req, res) {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: post.id,
      },
    });

    if (comments === null) {
      res.json("message not found");
    }

    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to comment", details: error.message });
  }
}

module.exports = {
  showAllPost,
  createPost,
  searchPostByTitle,
  getPostDetail,
  createComment,
  getAllComments,
};
