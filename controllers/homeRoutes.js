const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// The `/` endpoint

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

// Display selected blog post and comments on post's page.
router.get("/blogpost/:id", async (req, res) => {
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

// Display all of user's blog posts on the user's dashboard.
router.get("/dashboard/:user", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ["name"], where: { name: req.params.user } },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
