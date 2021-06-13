var mongoose = require("mongoose");
const db = require("../db");

var ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  file: {
    type: String,
    ref: "File",
    required: true,
  }
});
module.exports = db.model("Ticket", ticketSchema);
