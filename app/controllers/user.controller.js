const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nickname) {
    res.status(400).send({
      message: "Nickname can not be empty!"
    });
    return;
  }

  // Create a USer
  const user = {
    nickname: req.body.nickname,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    description: req.body.description
  };

  // Save Tutorial in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const nickname = req.query.nickname;
  var condition = nickname ? { nickname: { [Op.like]: `%${nickname}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};
