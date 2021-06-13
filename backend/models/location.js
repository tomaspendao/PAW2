var mongoose = require("mongoose");
const db = require("../db");

var locationSchema = new mongoose.Schema({
  place: { type: String, required:true, unique:true},
  max: { type: Number, required:true},
  limit: { type: Number, required:true},
});
module.exports = db.model("Location", locationSchema);
