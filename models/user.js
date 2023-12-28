"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      // firstName: DataTypes.STRING,
      // lastName: DataTypes.STRING,
      // dateOfBirth: DataTypes.DATE,
      // email: DataTypes.STRING,
      // username: DataTypes.STRING,
      // password: DataTypes.STRING,
      // role: DataTypes.ENUM,
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "guest"),
        defaultValue: "user",
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "User",
    }
  );
  return User;
};
