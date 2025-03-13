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
var _require = require("./organization.service"),
  organizationCreateService = _require.organizationCreateService,
  getorganizationService = _require.getorganizationService,
  getByIdorganizationService = _require.getByIdorganizationService,
  organizationUpdateService = _require.organizationUpdateService,
  deleteorganizationService = _require.deleteorganizationService,
  getByStrOrganizationService = _require.getByStrOrganizationService,
  excelDataOrganizationService = _require.excelDataOrganizationService;
var ErrorResponse = require('../utils/errorResponse');
var _require2 = require("../utils/validation"),
  organizationValidation = _require2.organizationValidation,
  allQueryValidation = _require2.allQueryValidation;
var _require3 = require("../utils/response.validation"),
  validationResponse = _require3.validationResponse;
var _require4 = require('../utils/errorCatch'),
  errorCatch = _require4.errorCatch;
var ExcelJS = require('exceljs');
var path = require('path');
var pool = require('../config/db');
var xlsx = require('xlsx');
var organizationCreate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var user_id, data, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user_id = req.user.id;
          data.str = data.str.replace(/\s+/g, '');
          data = validationResponse(organizationValidation, req.body);
          if (!data.str) {
            _context.next = 7;
            break;
          }
          _context.next = 7;
          return getByStrOrganizationService(data.str, user_id, req.i18n);
        case 7:
          _context.next = 9;
          return organizationCreateService(_objectSpread(_objectSpread({}, data), {}, {
            user_id: user_id
          }));
        case 9:
          result = _context.sent;
          return _context.abrupt("return", res.success(req.i18n.t('createSuccess'), 201, null, result));
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          errorCatch(_context.t0, res);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function organizationCreate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var organizationGet = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var user_id, _validationResponse, page, limit, search, offset, _yield$getorganizatio, data, total, pageCount, meta;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user_id = req.user.id;
          _validationResponse = validationResponse(allQueryValidation, req.query), page = _validationResponse.page, limit = _validationResponse.limit, search = _validationResponse.search;
          offset = (page - 1) * limit;
          _context2.next = 6;
          return getorganizationService(user_id, search, offset, limit);
        case 6:
          _yield$getorganizatio = _context2.sent;
          data = _yield$getorganizatio.data;
          total = _yield$getorganizatio.total;
          pageCount = Math.ceil(total / limit);
          meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1
          };
          return _context2.abrupt("return", res.success(req.i18n.t('getSuccess'), 201, meta, data));
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          errorCatch(_context2.t0, res);
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function organizationGet(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var organizationGetById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var user_id, id, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          _context3.next = 5;
          return getByIdorganizationService(user_id, id, true, req.i18n);
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
  return function organizationGetById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var organizationUpdate = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var user_id, id, _req$body, gazna_numbers, account_numbers, data, old_data, _iterator, _step, _loop, _ret, _iterator2, _step2, _loop2, _ret2, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          _req$body = req.body, gazna_numbers = _req$body.gazna_numbers, account_numbers = _req$body.account_numbers;
          data = validationResponse(organizationValidation, req.body);
          _context6.next = 7;
          return getByIdorganizationService(user_id, id, null, req.i18n);
        case 7:
          old_data = _context6.sent;
          data.str = data.str.replace(/\s+/g, '');
          if (!(old_data.str !== data.str)) {
            _context6.next = 12;
            break;
          }
          _context6.next = 12;
          return getByStrOrganizationService(data.str, user_id, req.i18n);
        case 12:
          _iterator = _createForOfIteratorHelper(gazna_numbers);
          _context6.prev = 13;
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
        case 16:
          if ((_step = _iterator.n()).done) {
            _context6.next = 23;
            break;
          }
          return _context6.delegateYield(_loop(), "t0", 18);
        case 18:
          _ret = _context6.t0;
          if (!_ret) {
            _context6.next = 21;
            break;
          }
          return _context6.abrupt("return", _ret.v);
        case 21:
          _context6.next = 16;
          break;
        case 23:
          _context6.next = 28;
          break;
        case 25:
          _context6.prev = 25;
          _context6.t1 = _context6["catch"](13);
          _iterator.e(_context6.t1);
        case 28:
          _context6.prev = 28;
          _iterator.f();
          return _context6.finish(28);
        case 31:
          _iterator2 = _createForOfIteratorHelper(account_numbers);
          _context6.prev = 32;
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
        case 35:
          if ((_step2 = _iterator2.n()).done) {
            _context6.next = 42;
            break;
          }
          return _context6.delegateYield(_loop2(), "t2", 37);
        case 37:
          _ret2 = _context6.t2;
          if (!_ret2) {
            _context6.next = 40;
            break;
          }
          return _context6.abrupt("return", _ret2.v);
        case 40:
          _context6.next = 35;
          break;
        case 42:
          _context6.next = 47;
          break;
        case 44:
          _context6.prev = 44;
          _context6.t3 = _context6["catch"](32);
          _iterator2.e(_context6.t3);
        case 47:
          _context6.prev = 47;
          _iterator2.f();
          return _context6.finish(47);
        case 50:
          _context6.next = 52;
          return organizationUpdateService(_objectSpread(_objectSpread({}, data), {}, {
            id: id,
            old_data: old_data
          }));
        case 52:
          result = _context6.sent;
          return _context6.abrupt("return", res.success(req.i18n.t('updateSuccess'), 200, null, result));
        case 56:
          _context6.prev = 56;
          _context6.t4 = _context6["catch"](0);
          errorCatch(_context6.t4, res);
        case 59:
        case "end":
          return _context6.stop();
      }
    }, _callee4, null, [[0, 56], [13, 25, 28, 31], [32, 44, 47, 50]]);
  }));
  return function organizationUpdate(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var organizationDelete = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user_id, id;
    return _regeneratorRuntime().wrap(function _callee5$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          _context7.next = 5;
          return getByIdorganizationService(user_id, id, null, req.i18n);
        case 5:
          _context7.next = 7;
          return deleteorganizationService(id);
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
  return function organizationDelete(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var excelDataOrganization = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var user_id, workbook, worksheet, headerRow, col, _yield$excelDataOrgan, data, total, _iterator3, _step3, organizationData, totalRow, fileName, filePath;
    return _regeneratorRuntime().wrap(function _callee6$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          user_id = req.user.id;
          workbook = new ExcelJS.Workbook();
          worksheet = workbook.addWorksheet('Tashkilot Ma\'lumotlari');
          worksheet.columns = [{
            header: 'Tashkilot nomi',
            key: 'name',
            width: 30
          }, {
            header: 'Manzil',
            key: 'address',
            width: 50
          }, {
            header: 'STIR',
            key: 'str',
            width: 20
          }, {
            header: 'Bank nomi',
            key: 'bank_name',
            width: 50
          }, {
            header: 'MFO',
            key: 'mfo',
            width: 20
          }, {
            header: 'Hisob raqami',
            key: 'account_number',
            width: 30
          }, {
            header: 'G`azna1',
            key: 'treasury1',
            width: 30
          }, {
            header: 'G`azna2',
            key: 'treasury2',
            width: 30
          }];
          headerRow = worksheet.getRow(1);
          headerRow.font = {
            bold: true
          };
          headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
              argb: 'FFFFFFFF'
            }
          };
          headerRow.alignment = {
            horizontal: 'center'
          };
          headerRow.height = 30;
          headerRow.eachCell(function (cell) {
            cell.border = {
              top: {
                style: 'thin',
                color: {
                  argb: 'FF000000'
                }
              },
              left: {
                style: 'thin',
                color: {
                  argb: 'FF000000'
                }
              },
              bottom: {
                style: 'thin',
                color: {
                  argb: 'FF000000'
                }
              },
              right: {
                style: 'thin',
                color: {
                  argb: 'FF000000'
                }
              }
            };
          });
          for (col = 1; col <= worksheet.columns.length; col++) {
            worksheet.getColumn(col).alignment = {
              vertical: 'middle',
              horizontal: 'center'
            };
          }
          _context8.next = 14;
          return excelDataOrganizationService(user_id);
        case 14:
          _yield$excelDataOrgan = _context8.sent;
          data = _yield$excelDataOrgan.data;
          total = _yield$excelDataOrgan.total;
          _iterator3 = _createForOfIteratorHelper(data);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              organizationData = _step3.value;
              worksheet.addRow(organizationData);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          totalRow = worksheet.addRow(['Tashkilotlar soni ', "".concat(total)]);
          totalRow.font = {
            bold: true
          };
          totalRow.getCell(1).alignment = {
            horizontal: 'center'
          };
          fileName = "organization_".concat(Date.now(), ".xlsx");
          filePath = path.join(__dirname, '../../public/exports', fileName);
          _context8.next = 26;
          return workbook.xlsx.writeFile(filePath);
        case 26:
          return _context8.abrupt("return", res.download(filePath, function (err) {
            if (err) throw new ErrorResponse(err, err.statusCode);
          }));
        case 29:
          _context8.prev = 29;
          _context8.t0 = _context8["catch"](0);
          errorCatch(_context8.t0, res);
        case 32:
        case "end":
          return _context8.stop();
      }
    }, _callee6, null, [[0, 29]]);
  }));
  return function excelDataOrganization(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var forPdfData = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var user_id, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          user_id = req.user.id;
          _context9.next = 4;
          return excelDataOrganizationService(user_id);
        case 4:
          result = _context9.sent;
          return _context9.abrupt("return", res.success(req.i18n.t('getSuccess'), 200, null, result));
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          errorCatch(_context9.t0, res);
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function forPdfData(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var importExcelData = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var user_id, filePath, workbook, sheetName, sheet, data, _iterator4, _step4, item;
    return _regeneratorRuntime().wrap(function _callee8$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          user_id = req.user.id;
          if (req.file) {
            _context10.next = 3;
            break;
          }
          throw new ErrorResponse(req.i18n.t('fileErrror'), 404);
        case 3:
          filePath = req.file.path;
          _context10.prev = 4;
          workbook = xlsx.readFile(filePath);
          sheetName = workbook.SheetNames[0];
          sheet = workbook.Sheets[sheetName];
          data = xlsx.utils.sheet_to_json(sheet).map(function (row) {
            var newRow = {};
            for (var key in row) {
              newRow[key.trim()] = row[key];
            }
            return newRow;
          });
          _iterator4 = _createForOfIteratorHelper(data);
          _context10.prev = 10;
          _iterator4.s();
        case 12:
          if ((_step4 = _iterator4.n()).done) {
            _context10.next = 20;
            break;
          }
          item = _step4.value;
          if (item.name) {
            _context10.next = 16;
            break;
          }
          throw new ErrorResponse("Row contains empty 'name' field: ".concat(JSON.stringify(item)), 400);
        case 16:
          _context10.next = 18;
          return pool.query("INSERT INTO organization(name, user_id) VALUES($1, $2)", [item.name.trim(), user_id]);
        case 18:
          _context10.next = 12;
          break;
        case 20:
          _context10.next = 25;
          break;
        case 22:
          _context10.prev = 22;
          _context10.t0 = _context10["catch"](10);
          _iterator4.e(_context10.t0);
        case 25:
          _context10.prev = 25;
          _iterator4.f();
          return _context10.finish(25);
        case 28:
          return _context10.abrupt("return", res.status(201).json({
            message: 'Created successfully'
          }));
        case 31:
          _context10.prev = 31;
          _context10.t1 = _context10["catch"](4);
          errorCatch(_context10.t1, res);
        case 34:
        case "end":
          return _context10.stop();
      }
    }, _callee8, null, [[4, 31], [10, 22, 25, 28]]);
  }));
  return function importExcelData(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
module.exports = {
  organizationCreate: organizationCreate,
  organizationGet: organizationGet,
  organizationGetById: organizationGetById,
  organizationUpdate: organizationUpdate,
  organizationDelete: organizationDelete,
  excelDataOrganization: excelDataOrganization,
  forPdfData: forPdfData,
  importExcelData: importExcelData
};