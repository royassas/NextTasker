module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      color: {
        type: Sequelize.STRING
      }
    });
  
    return Category;
  };
  