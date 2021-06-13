const mongoose = require("mongoose");

const connection = mongoose.createConnection("mongodb://localhost/tpPAW");

module.exports = connection;
