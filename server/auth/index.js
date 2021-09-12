//routes for authentication

const router = require("express").Router();
const {
  models: { User },
} = require("../db");

//create user on signup
router.post("/signup", async (req, res, next) => {
  try {
    //deconstructing req.body when creating user to protect against injection
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    //generate token for new user
    res.send({ token: await user.createToken() });
  } catch (err) {
    //send message if username already in use
    if (err.name === "SequelizeUniqueConstraintError") {
      res.send("Username already in use. Please try another username.");
    } else {
      next(err);
    }
  }
});

//check authentication for login route
router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

//return logged in user info
router.get("/self", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
