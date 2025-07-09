const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const corsOption = {
  origin: ["http://localhost:5173"],
};

const PORT = process.env.PORT || 8080;

app.use(cors(corsOption))

app.get("/api", (req, res) => {
  res.json({ a: ["abc", "def", "ghi"] });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/api`);
});
