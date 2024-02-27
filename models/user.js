"use strict";
const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "First name is required",
          },
          len: {
            args: [2, 50],
            msg: "First name must be between 2 and 50 characters long",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Last name is required",
          },
          len: {
            args: [2, 50],
            msg: "Last name must be between 2 and 50 characters long",
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          len: {
            args: [3, 20],
            msg: "Username must be between 3 and 20 charaters long",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 100],
            msg: "Password must be between 6 and 100 characters long",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "guest"),
        defaultValue: "user",
        allowNull: false,
        validate: {
          isIn: {
            args: [["admin", "user", "guest"]],
            msg: "Invalid role. Allowed values: admin, user, guest",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    }
  );
  return User;
};
