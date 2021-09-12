const router = require("express").Router();

//access user routes
router.use("/users", require("./users"));

//error handling
router.use((req, res, next) => {
  const err = new Error("Page not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
