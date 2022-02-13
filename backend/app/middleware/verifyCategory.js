const db = require("../models");
const Category = db.categories;

checkDuplicateCategory = (req, res, next) => {
  Category.findOne({
    where: {
      description: req.body.description,
    },
  }).then((category) => {
    if (category) {
      res.status(400).send({
        message: "Failed! Category description is already in use!",
      });
      return;
    }

    next();
  });
};

const verifyCategory = {
  checkDuplicateCategory: checkDuplicateCategory,
};

module.exports = verifyCategory;
