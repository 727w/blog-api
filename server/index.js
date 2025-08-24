const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const authRouter = require("./routes/authRouter");
require("dotenv").config();
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("public/images"));

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/api", (req, res) => {
  res.json({ message: "hello world" });
});
app.use("/", userRouter);
app.use("/", postRouter);
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/api`);
});
