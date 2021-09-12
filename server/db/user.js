const Sequelize = require("sequelize");
const db = require("./db");

//for tokens and encrypting password
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//.env for secrets hidden in gitignore
require("dotenv").config();

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
});

//instance method on user
User.prototype.createToken = () => {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

//hash password
User.beforeCreate(async (user) => {
  const SALT_COUNT = 5;
  const hashedPassword = await bcrypt.hash(user.password, SALT_COUNT);
  user.password = hashedPassword;
  return user.password;
});

//create class methods
User.authenticate = async ({ username, password }) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  //compare encrypted password to password string
  const isValid = await bcrypt.compare(password, user.password);
  //if user exists and isValid is true, make token
  if (user && isValid) {
    return user.createToken();
  } else {
    const error = Error("Username or password is incorrect. Try again.");
    error.status = 401;
    throw error;
  }
};

User.findByToken = async (token) => {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findbyPk(id);
    if (user) {
      return user;
    } else {
      const err = Error("Not found");
      err.status = 401;
      throw err;
    }
  } catch (e) {
    const error = Error("Bad crendentials");
    error.status = 401;
    throw error;
  }
};

module.exports = User;
