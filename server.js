const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const dotenv = require("dotenv");
require("./config/connectDB.js");

const app = express();
app.use(express.json());

// let corsOptions = {
//   origin: "http://localhost: 60001",
// };

app.use(cors());
app.use(express.urlencoded({ extended: true }));

dotenv.config({ path: "./config/.env" });

app.get("/", async (req, res) => {
  res.send("Hello developer! API is working.");
});

// app.use("/api/v1",)

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(
    chalk.bold.yellow(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});
