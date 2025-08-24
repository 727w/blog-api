const express = require("express");
const router = express.Router();
const { login, logout } = require("../controller/authController");

router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);

module.exports = router;
