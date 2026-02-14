const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};

module.exports = verifyToken;