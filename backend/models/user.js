var mongoose = require("mongoose");
const db = require("../db");

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: {type: String, required: true },
  role: { type: String, required: true },
});

module.exports = db.model("User", userSchema);
