//middleware

const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");

//access files from public folder
app.use(express.static(path.join(__dirname, "..", "public")));

//logging middleware
app.use(morgan("dev"));

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//access auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

//home page
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

//error handling
//not found/404 error
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Page not found.");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

//send html if req does not match existing routes
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

//last catch
//server side error handling
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .send(
      err.message ||
        "Oops, there is an error on the server side. Please try again!"
    );
});

module.exports = app;
