const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

//para não pluraziar os nomes automaticamente
mongoose.pluralize(null);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

module.exports = db;