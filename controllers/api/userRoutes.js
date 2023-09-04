const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// *** DELETE LATER - TEST ROUTE
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll(
        // {include: [{ model: Post }, { model: Comment }],}
        );
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Sign Up Route
router.post("/", async (req, res) => {
  try {
    const validName = await User.findOne({ where: { name: req.body.name } });

    // If username is taken, message is displayed prompting to choose another username.
    if (validName) {
      res
        .status(400)
        .json({ message: "Username is taken. Choose another username." });
      return;
    }

    const userData = await User.create(req.body);

    // Session Storage Placeholder

    res.status(200).json({ user: userData, message: "Successfully created account!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    // Session Storage Placeholder

    res.json({ user: userData, message: "You are now logged in!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
