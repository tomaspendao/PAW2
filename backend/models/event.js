var mongoose = require("mongoose");
const db = require("../db");

var eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  //localização
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  poster: String,
});

module.exports = db.model("Event", eventSchema);
