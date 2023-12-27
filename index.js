const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const dotenv = require("dotenv");
const sequelize = require("./config/connectDB.js");

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

sequelize
  .sync()
  .then(() => {
    console.log(chalk.greenBright("Database synchronized successfully!"));
  })
  .catch((error) => {
    console.error("Unable to synchronize the database: ", error);
  });

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(
    chalk.bold.yellow(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});
