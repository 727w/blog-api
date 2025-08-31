const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

    const postsWithImageUrl = posts.map((post) => ({
      ...post,
      imageUrl: post.cover_path
        ? `http://localhost:8080/images/${post.cover_path}`
        : null,
    }));

    res.json(postsWithImageUrl);
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

  const imagePath = imageFile.filename;

  if (!title || !content) {
    return res.status(400).json({ error: "Fields can't be empty" });
  }
  if (!imageFile) {
    return res.status(400).json({ error: "Image file is required" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
        cover_path: imagePath,
      },
    });
    res.status(200).json(post.id);
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

    const author = await prisma.user.findUnique({
      where: {
        id: postDetail.authorId,
      },
    });

    if (postDetail === null) {
      res
        .status(404)
        .json({ error: "Could not find the post detail you were looking for" });
    }

    if (author === undefined) {
      res.status(404).json({ error: "Author not found" });
    }

    const post = {
      ...postDetail,
      imageUrl: postDetail.cover_path
        ? `http://localhost:8080/images/${postDetail.cover_path}`
        : null,
      authorName: author ? author.username : "Unknown Author",
    };

    res.json(post);
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

    const userName = await prisma.user.findMany({
      where: {
        id: {
          in: comments.map((comment) => comment.userId),
        },
      },
    });

    if (comments === null) {
      res.json("message not found");
    }

    const commentsWithUser = comments.map((comment) => {
      const user = userName.find((user) => user.id === comment.userId);
      return {
        ...comment,
        user: user ? user.username : "Unknown User",
        createdAt: comment.createdAt.toISOString(),
      };
    });

    res.json(commentsWithUser);
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
