"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: false
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  phone: {
    type: String,
    require: false
  },
  address: {
    type: String,
    require: false
  },
  city: {
    type: String,
    require: false
  },
  country: {
    type: String,
    require: false
  },
  postalCode: {
    type: String,
    require: false
  },
  about: {
    type: String,
    require: false
  },
  education: {
    type: String,
    require: false
  },
  occupation: {
    type: String,
    require: false
  },
  imageData: {
    type: String
  },
  resetPass: {
    type: Boolean
  },
  active: {
    type: Boolean,
    "default": true
  },
  createAt: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true
}); //-----PARA ALTERAR O NOME DO CAMPO DE "_ID" PARA "ID"
//UserSchema.method("toJSON", function () {
//    const { __v, _id, ...object } = this.toObject();
//    object.id = _id;
//    return object;
//});
//mongoose function used to execute actions before saved

UserSchema.pre('save', function _callee(next) {
  var hash;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 10));

        case 2:
          hash = _context.sent;
          this.password = hash;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
module.exports = mongoose.model('User', UserSchema);