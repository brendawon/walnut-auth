const db = require("./db");

const User = require("./user");

module.exports = {
  db,
  models: {
    User,
  },
};
