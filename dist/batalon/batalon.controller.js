"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("./db.js"),
  batalonCreateService = _require.batalonCreateService,
  getBatalonService = _require.getBatalonService,
  getByIdBatalonService = _require.getByIdBatalonService,
  batalonUpdateService = _require.batalonUpdateService,
  deleteBatalonService = _require.deleteBatalonService,
  getByNameBatalonService = _require.getByNameBatalonService;
var _require2 = require("../utils/validation"),
  batalionValidation = _require2.batalionValidation;
var _require3 = require("../utils/resFunc"),
  resFunc = _require3.resFunc;
var _require4 = require("../utils/response.validation"),
  validationResponse = _require4.validationResponse;
var _require5 = require('../utils/errorCatch'),
  errorCatch = _require5.errorCatch;
var batalonCreate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var user_id, data, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user_id = req.user.id;
          data = validationResponse(batalionValidation, req.body);
          _context.next = 5;
          return getByNameBatalonService(user_id, data.name, true, req.i18n);
        case 5:
          _context.next = 7;
          return batalonCreateService(_objectSpread({
            user_id: user_id
          }, data));
        case 7:
          result = _context.sent;
          return _context.abrupt("return", res.success(req.i18n.t('createSuccess'), 201, null, result));
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          errorCatch(_context.t0, res);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function batalonCreate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var batalonGet = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var user_id, birgada, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user_id = req.user.id;
          birgada = req.query.birgada;
          _context2.next = 5;
          return getBatalonService(user_id, birgada);
        case 5:
          result = _context2.sent;
          return _context2.abrupt("return", res.success(req.i18n.t('getSuccess'), 200, null, result.data));
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          errorCatch(_context2.t0, res);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function batalonGet(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var user_id, id, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          _context3.next = 5;
          return getByIdBatalonService(user_id, id, null, null, req.i18n);
        case 5:
          result = _context3.sent;
          return _context3.abrupt("return", res.success(req.i18n.t('getSuccess'), 200, null, result));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          errorCatch(_context3.t0, res);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var batalonUpdate = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var user_id, id, _req$body, gazna_numbers, account_numbers, data, old_data, _iterator, _step, _loop, _ret, _iterator2, _step2, _loop2, _ret2, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          _req$body = req.body, gazna_numbers = _req$body.gazna_numbers, account_numbers = _req$body.account_numbers;
          data = validationResponse(batalionValidation, req.body);
          _context6.next = 7;
          return getByIdBatalonService(user_id, id, null, null, req.i18n);
        case 7:
          old_data = _context6.sent;
          if (!(old_data.name !== data.name)) {
            _context6.next = 11;
            break;
          }
          _context6.next = 11;
          return getByNameBatalonService(user_id, data.name, true, req.i18n);
        case 11:
          _iterator = _createForOfIteratorHelper(gazna_numbers);
          _context6.prev = 12;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var gazna, check;
            return _regeneratorRuntime().wrap(function _loop$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  gazna = _step.value;
                  if (!gazna.id) {
                    _context4.next = 5;
                    break;
                  }
                  check = old_data.gazna_numbers.find(function (item) {
                    return item.id === gazna.id;
                  });
                  if (check) {
                    _context4.next = 5;
                    break;
                  }
                  return _context4.abrupt("return", {
                    v: res.error(req.i18n.t('gazna_not_found'), 404)
                  });
                case 5:
                case "end":
                  return _context4.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 15:
          if ((_step = _iterator.n()).done) {
            _context6.next = 22;
            break;
          }
          return _context6.delegateYield(_loop(), "t0", 17);
        case 17:
          _ret = _context6.t0;
          if (!_ret) {
            _context6.next = 20;
            break;
          }
          return _context6.abrupt("return", _ret.v);
        case 20:
          _context6.next = 15;
          break;
        case 22:
          _context6.next = 27;
          break;
        case 24:
          _context6.prev = 24;
          _context6.t1 = _context6["catch"](12);
          _iterator.e(_context6.t1);
        case 27:
          _context6.prev = 27;
          _iterator.f();
          return _context6.finish(27);
        case 30:
          _iterator2 = _createForOfIteratorHelper(account_numbers);
          _context6.prev = 31;
          _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
            var acccount_number, check;
            return _regeneratorRuntime().wrap(function _loop2$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  acccount_number = _step2.value;
                  if (!acccount_number.id) {
                    _context5.next = 5;
                    break;
                  }
                  check = old_data.account_numbers.find(function (item) {
                    return item.id === acccount_number.id;
                  });
                  if (check) {
                    _context5.next = 5;
                    break;
                  }
                  return _context5.abrupt("return", {
                    v: res.error(req.i18n.t('account_number_not_found'), 404)
                  });
                case 5:
                case "end":
                  return _context5.stop();
              }
            }, _loop2);
          });
          _iterator2.s();
        case 34:
          if ((_step2 = _iterator2.n()).done) {
            _context6.next = 41;
            break;
          }
          return _context6.delegateYield(_loop2(), "t2", 36);
        case 36:
          _ret2 = _context6.t2;
          if (!_ret2) {
            _context6.next = 39;
            break;
          }
          return _context6.abrupt("return", _ret2.v);
        case 39:
          _context6.next = 34;
          break;
        case 41:
          _context6.next = 46;
          break;
        case 43:
          _context6.prev = 43;
          _context6.t3 = _context6["catch"](31);
          _iterator2.e(_context6.t3);
        case 46:
          _context6.prev = 46;
          _iterator2.f();
          return _context6.finish(46);
        case 49:
          _context6.next = 51;
          return batalonUpdateService(_objectSpread(_objectSpread({}, data), {}, {
            old_data: old_data,
            id: id
          }));
        case 51:
          result = _context6.sent;
          return _context6.abrupt("return", res.success(req.i18n.t('updateSuccess'), 200, null, result));
        case 55:
          _context6.prev = 55;
          _context6.t4 = _context6["catch"](0);
          errorCatch(_context6.t4, res);
        case 58:
        case "end":
          return _context6.stop();
      }
    }, _callee4, null, [[0, 55], [12, 24, 27, 30], [31, 43, 46, 49]]);
  }));
  return function batalonUpdate(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var batalonDelete = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user_id, id;
    return _regeneratorRuntime().wrap(function _callee5$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          _context7.next = 5;
          return getByIdBatalonService(user_id, id, null, null, req.i18n);
        case 5:
          _context7.next = 7;
          return deleteBatalonService(id);
        case 7:
          return _context7.abrupt("return", res.success(req.i18n.t('deleteSuccess'), 200));
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          errorCatch(_context7.t0, res);
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function batalonDelete(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  batalonCreate: batalonCreate,
  batalonGet: batalonGet,
  getById: getById,
  batalonUpdate: batalonUpdate,
  batalonDelete: batalonDelete
};