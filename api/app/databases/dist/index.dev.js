"use strict";

var dbConfig = require("../config/db.config.js");

var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
var db = {};
db.mongoose = mongoose;
db.url = dbConfig.url; //db.user = require("../models/user.model")(mongoose);
//db.question = require("../models/question.model.js")(mongoose);

module.exports = db;