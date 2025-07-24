const express = require("express");
const router = express.Router();
const { login } = require("../controller/authController");

router.post("/api/auth/login", login);

module.exports = router;
