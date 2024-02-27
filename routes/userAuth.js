const express = require("express");
const router = express.Router();

const { userRegistration } = require("../controllers/userAuth");

// const { authenticateUser, isAdmin } = require("../middlewares/authJwt");

router.post("/register", userRegistration);

module.exports = router;
