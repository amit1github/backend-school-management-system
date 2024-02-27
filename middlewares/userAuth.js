// verifyToken, isAdmin, isModerator, isModeratorIrAdmin

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.authenticateUser = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Permission denied. Admin access reuired",
    });
  }
};
