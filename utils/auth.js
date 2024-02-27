const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();

// desc: Generates a JSON Web Token (JWT) for a user.
const generateAuthToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

// desc: Verifies the validity of an JWT and retrieves the corresponding user.
const verifyAuthToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { generateAuthToken, verifyAuthToken };
