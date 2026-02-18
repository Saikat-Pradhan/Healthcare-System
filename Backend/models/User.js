const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, { timestamps: true });

module.exports = mongoose.model("Users", UserSchema);