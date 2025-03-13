"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Joi = require('joi');
exports.Schema = /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
  }
  return _createClass(_class, null, [{
    key: "createSchema",
    value: function createSchema() {
      return Joi.object({
        body: Joi.object({
          fio: Joi.string().trim().required(),
          batalon_id: Joi.number().min(1).integer().allow(null),
          account_number: Joi.string().trim().allow('', null),
          xisob_raqam: Joi.string().trim().allow('', null)
        })
      }).options({
        stripUnknown: true
      });
      ;
    }
  }, {
    key: "importSchema",
    value: function importSchema() {
      return Joi.object({
        FIO: Joi.string().trim().required(),
        Batalon: Joi.string().trim(),
        Karta_raqam: Joi.string().trim(),
        Xisob_raqam: Joi.string().trim()
      }).options({
        stripUnknown: true
      });
      ;
    }
  }, {
    key: "updateSchema",
    value: function updateSchema() {
      return Joi.object({
        body: Joi.object({
          fio: Joi.string().trim().required(),
          batalon_id: Joi.number().min(1).integer().allow(null),
          account_number: Joi.string().trim().allow('', null),
          xisob_raqam: Joi.string().trim().allow('', null)
        }),
        params: Joi.object({
          id: Joi.number().required().min(1).integer()
        })
      }).options({
        stripUnknown: true
      });
      ;
    }
  }, {
    key: "exportSchema",
    value: function exportSchema() {
      return Joi.object({
        query: Joi.object({
          batalon_id: Joi.number().min(1).integer(),
          search: Joi.string().trim()
        })
      }).options({
        stripUnknown: true
      });
      ;
    }
  }]);
}();