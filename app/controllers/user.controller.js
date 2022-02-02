const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nickname) {
    res.status(400).send({
      message: "Nickname can not be empty!"
    });
    return;
  }

  // Create a User
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
  var condition = nickname
    ? { nickname: { [Op.like]: `%${nickname}%` } }
    : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// auth User with nickname and password
exports.findAuth = (req, res) => {
  
  // Validate request
  if (!req.body.nickname || !req.body.password) {
    res.status(400).send({
      message: "Nickname and password can not be empty!"
    });
    return;
  }
  const nickname = req.body.nickname;

  User.findOne({
    where: {
      nickname: { [Op.like]: `%${nickname}%` },

    }
  })
    .then(data => {
      if (data) {
        if (bcrypt.compareSync(req.body.password, data.password)) {
          res.json({auth: true});
        } else {
          res.json({auth: false});
        }
      } else {
        res.json({auth: false});
      }

      
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};
