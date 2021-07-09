"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var jwt = require('jsonwebtoken');

var authConfig = require('../config/auth.config'); //next used when the prex step


exports.verifyJwt = function _callee(req, res, next) {
  var authHeader, parts, _parts, scheme, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authHeader = req.headers.authorization;

          if (authHeader) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            error: 'no token provided'
          }));

        case 3:
          parts = authHeader.split(' ');

          if (!(!parts.length === 2)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            error: 'Token error'
          }));

        case 6:
          _parts = _slicedToArray(parts, 2), scheme = _parts[0], token = _parts[1];

          if (/^Bearer$/i.test(scheme)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            error: 'Token malformatted'
          }));

        case 9:
          jwt.verify(token, authConfig.secret, function (err, decoded) {
            if (err) return res.status(401).send({
              error: 'token invalid'
            });
            req.userId = decoded.id;
            return next();
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};