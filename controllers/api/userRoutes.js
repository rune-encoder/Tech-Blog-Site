const router = require("express").Router();
const { User } = require("../../models");

// The `/api/users` endpoint

// CREATE: User Sign-Up Route
router.post("/", async (req, res) => {
  try {
    const validName = await User.findOne({ where: { name: req.body.name } });

    // Check if username is taken, message is displayed prompting to choose another username.
    if (validName) {
      res
        .status(400)
        .json({ message: "Username is taken. Choose another username." });
      return;
    }

    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "Successfully created account!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// VALIDATE: User Sign-In/Login Route
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

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User Logout Route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// ***Future : Option to UPDATE Username

// ***Future: Option to DELETE Username

module.exports = router;
