module.exports = (sequelize, Sequelize) => {
  const bcrypt = require("bcrypt");
  const User = sequelize.define(
    "user",
    {
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      }
    },
    {
      paranoid: true,
      hooks: {
        beforeCreate: async user => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: async user => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        }
      },
      instanceMethods: {
        validPassword: password => {
          return bcrypt.compareSync(password, this.password);
        }
      }
    }
  );
  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };

  return User;
};
