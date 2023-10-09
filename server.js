const express = require("express");
const dotenv = require("dotenv");

// Route files
const expenses = require("./routes/expenses");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use("/api/v1/expenses", expenses);

app.get("/api/v1/expenses", (req, res) => {
  res.status(200).json("hello from Express");
});

const PORT = process.env.PORT || 6000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
