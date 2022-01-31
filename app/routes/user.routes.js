module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);

  // Retrieve auth for user with nickname and password
  router.post("/auth", users.findAuth);

  app.use("/api/users", router);
};
