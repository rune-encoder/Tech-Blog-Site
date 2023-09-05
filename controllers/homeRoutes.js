const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// The `/` endpoint

// Display all blog posts on homepage.
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);//*===============================================*

    res.render("homepage", { posts });
    // res.status(200).json(blogPosts);
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

    const post = postData.get({ plain: true });
    console.log(post); //*===============================================*

    res.render('blogpost', { post });
    // res.status(200).json(postData);
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

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts); //*===============================================*

    res.render('dashboard', { posts });
    // res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
