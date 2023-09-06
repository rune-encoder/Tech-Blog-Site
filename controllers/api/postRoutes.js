const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// The `/api/posts` endpoint

// Creates a new blog post.
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates an existing blog post using its `id`.
router.put("/:id", withAuth, async (req, res) => {
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
router.delete("/:id", withAuth, async (req, res) => {
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
