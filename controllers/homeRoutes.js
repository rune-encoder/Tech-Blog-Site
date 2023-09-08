const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// The `/` endpoint

// HOME: Display all blog posts on homepage.
router.get("/", async (req, res) => {
  try {
    console.log(req.session.user_name);
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// BLOG POST: Display selected blog post and comments on post's page.
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

    const post = postData.get({ plain: true });

    res.render("blogpost", {
      post,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// REDIRECT: Display message you need to be logged in.
router.get("/dashboard", async (req, res) => {
  try {
    res.render("redirect");
  } catch (err) {
    res.status(500).json(err);
  }
});

// DASHBOARD: Display all of user's blog posts on the user's dashboard.
router.get("/dashboard/:user", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ["name"], where: { name: req.params.user } },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN: Display login page.
router.get("/login", async (req, res) => {
  try {
    res.render("login", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGNUP: Display Signup page.
router.get("/signup", async (req, res) => {
  try {
    res.render("signup", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
