const initializeUserModel = require("../models/user");
const { sequelize } = require("../config/connectDB");
const auth = require("../utils/auth");

const User = initializeUserModel(sequelize);

// @method POST
// @route /api/v1/user/register
// @desc To register a user
exports.userRegistration = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      role,
      dateOfBirth,
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
      role,
      dateOfBirth,
    });

    const token = auth.generateAuthToken(newUser.id);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      Token: token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
};

// @method POST
// @route /api/v1/user/register
// @desc for login a user
exports.login = async (req, res) => {
  const { username, password } = req.body;
};
