const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials =      require("./tutorial.model.js")(sequelize, Sequelize);
db.users =          require("./user.model.js")(sequelize, Sequelize);
db.role =           require("./role.model.js")(sequelize, Sequelize);
db.refreshToken =   require("./refreshToken.model.js")(sequelize, Sequelize);
db.categories =     require("./category.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.users.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.refreshToken.belongsTo(db.users, {
  foreignKey: 'userId', targetKey: 'id'
});
db.users.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
