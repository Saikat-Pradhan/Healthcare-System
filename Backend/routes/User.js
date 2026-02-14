const express = require("express");
const {
  UserLogin,
  UserRegister,
  googleAuth,
  resetPassword,
} = require("../controllers/User.js");

const router = express.Router();

// Routes
router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.post("/googleAuth", googleAuth);
router.post("/resetPassword", resetPassword);

module.exports = router;
