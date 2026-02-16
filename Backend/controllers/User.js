const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Users = require("../models/User.js");

dotenv.config();

// Register
const UserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists for this email!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Login
const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await Users.findOne({ email });

    if (!validUser) {
      return res.status(400).json({ error: "Incorrect Email ID" });
    }

    const isMatch = await bcrypt.compare(password, validUser.password);

    if (isMatch) {
      let token = jwt.sign({ email, id: validUser._id }, process.env.JWT_SECRET);
      return res.status(200).json({ token, validUser });
    } else {
      return res.status(401).json({ error: "Incorrect Password" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Sign in with Google
const googleAuth = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Missing authorization code" });

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    let user = await Users.findOne({ email });
    if (!user) {
      user = await Users.create({ name, email, picture });
    }

    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT || "7d",
    });

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Google Auth error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "New Password and Confirm Password must be the same!" });
    }

    const validUser = await Users.findOne({ email });

    if (!validUser) {
      return res.status(404).json({ error: "Invalid Email!" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    validUser.password = hashedNewPassword;
    await validUser.save();

    return res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { UserRegister, UserLogin, googleAuth, resetPassword };