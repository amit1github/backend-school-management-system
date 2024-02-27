const express = require("express");
const router = express.Router();

// const { authenticateUser, isAdmin } = require("../middlewares/auth");

const userAuthRouter = require("./userAuth");

router.use("/user", userAuthRouter);

// --> Test route
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: `Hello developer, Api is Working! `,
  });
});

module.exports = router;
