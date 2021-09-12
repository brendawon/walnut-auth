//user routes

const router = require("express").Router();
const {
  models: { User },
} = require("../db");

//checks token before returning user info
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

//route to /api/users/
router.get("/", requireToken, async (req, res, next) => {
  try {
    //requireToken should only return the info if the token matches the logged in user
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
