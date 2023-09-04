const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// The `/api/posts` endpoint

// Display all blog posts on homepage.
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display selected blog posts and comments on post's page.
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["name"] },
        {
          model: Comment,
          attributes: ["content", "createdAt", "updatedAt"],
          include: [{ model: User, attributes: ["name"] }],
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new blog post.
router.post("/", async (req, res) => {
  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates an existing blog post using its `id`.
router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData[0]) {
      res.status(400).json({ message: "No Blog Post found with this ID." });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes an existing blog post using its `id`.
router.delete("/:id", async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!postData) {
        res.status(400).json({ message: "No Blog Post found with this ID." });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
