const { Sequelize } = require("sequelize");
const chalk = require("chalk");

const sequelize = new Sequelize("school_management_system", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      chalk.bold.cyan("Connection has been established successfully.")
    );
  } catch (error) {
    console.error(chalk.redBright("Unable to connect to the database:", error));
  }
})();

module.exports = sequelize;