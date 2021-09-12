//seed database for testing
const {
  db,
  models: { User },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log("Database is synced");

  //create user
  const users = await Promise.all([
    User.create({ username: "walnut", password: "thenutcracker" }),
    User.create({ username: "pistachio", password: "icecream" }),
    User.create({ username: "pecan", password: "pie" }),
  ]);

  console.log(`seeded ${users.length} users`);
  return {
    users: {
      walnut: users[0],
      pistachio: users[1],
      pecan: users[2],
    },
  };
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
