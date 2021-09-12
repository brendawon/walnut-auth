//express server
const app = require("./app");
const PORT = process.env.PORT || 3000;
const { db } = require("./db");
const seed = require("../script/seed");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

init();
