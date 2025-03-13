"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("../utils/validation"),
  paymentRequestValidation = _require.paymentRequestValidation,
  rasxodValidation = _require.rasxodValidation,
  rasxodQueryValidation = _require.rasxodQueryValidation;
var _require2 = require("../utils/resFunc"),
  resFunc = _require2.resFunc;
var _require3 = require("../utils/response.validation"),
  validationResponse = _require3.validationResponse;
var _require4 = require("../utils/errorCatch"),
  errorCatch = _require4.errorCatch;
var _require5 = require("./rasxod.service"),
  paymentRequestService = _require5.paymentRequestService,
  createRasxodDocService = _require5.createRasxodDocService,
  getRasxodService = _require5.getRasxodService,
  getByIdRasxodService = _require5.getByIdRasxodService,
  deeleteRasxodService = _require5.deeleteRasxodService,
  updateRasxodService = _require5.updateRasxodService;
var _require6 = require("../spravochnik/account.number/account.number.service"),
  getByIdaccount_numberService = _require6.getByIdaccount_numberService;
var _require7 = require("../batalon/db"),
  getByIdBatalonService = _require7.getByIdBatalonService;
var _require8 = require("./rasxod.service"),
  getByIdTaskService = _require8.getByIdTaskService;
var _require9 = require("../utils/return.summa"),
  returnStringSumma = _require9.returnStringSumma;
var ExcelJS = require("exceljs");
var _require10 = require("../utils/date.functions"),
  returnStringDate = _require10.returnStringDate;
var path = require("path");
var getPaymentRequest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var user_id, _validationResponse, account_number_id, batalon_id, to, from, _yield$paymentRequest, data, itogo;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user_id = req.user.id;
          _validationResponse = validationResponse(paymentRequestValidation, req.query), account_number_id = _validationResponse.account_number_id, batalon_id = _validationResponse.batalon_id, to = _validationResponse.to, from = _validationResponse.from;
          _context.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          _context.next = 7;
          return getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
        case 7:
          _context.next = 9;
          return paymentRequestService(account_number_id, batalon_id, from, to);
        case 9:
          _yield$paymentRequest = _context.sent;
          data = _yield$paymentRequest.data;
          itogo = _yield$paymentRequest.itogo;
          return _context.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, {
            itogo: itogo
          }, data));
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          errorCatch(_context.t0, res);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function getPaymentRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createRasxod = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var user_id, account_number_id, _req$body, batalon_account_number_id, batalon_gazna_number_id, data, batalon, check, _check, _iterator, _step, task, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          _req$body = req.body, batalon_account_number_id = _req$body.batalon_account_number_id, batalon_gazna_number_id = _req$body.batalon_gazna_number_id;
          data = validationResponse(rasxodValidation, req.body);
          data;
          _context2.next = 8;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 8:
          _context2.next = 10;
          return getByIdBatalonService(user_id, data.batalon_id, true, null, req.i18n);
        case 10:
          batalon = _context2.sent;
          if (!batalon_account_number_id) {
            _context2.next = 15;
            break;
          }
          check = batalon.account_numbers.find(function (item) {
            return item.id === batalon_account_number_id;
          });
          if (check) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("return", res.error(req.i18n.t("accountNumberNotFound"), 404));
        case 15:
          if (!batalon_gazna_number_id) {
            _context2.next = 19;
            break;
          }
          _check = batalon.gazna_numbers.find(function (item) {
            return item.id === batalon_gazna_number_id;
          });
          if (_check) {
            _context2.next = 19;
            break;
          }
          return _context2.abrupt("return", res.error(req.i18n.t("gaznaNumberNotFound"), 404));
        case 19:
          _iterator = _createForOfIteratorHelper(data.tasks);
          _context2.prev = 20;
          _iterator.s();
        case 22:
          if ((_step = _iterator.n()).done) {
            _context2.next = 28;
            break;
          }
          task = _step.value;
          _context2.next = 26;
          return getByIdTaskService(data.batalon_id, task.task_id, user_id, req.i18n);
        case 26:
          _context2.next = 22;
          break;
        case 28:
          _context2.next = 33;
          break;
        case 30:
          _context2.prev = 30;
          _context2.t0 = _context2["catch"](20);
          _iterator.e(_context2.t0);
        case 33:
          _context2.prev = 33;
          _iterator.f();
          return _context2.finish(33);
        case 36:
          _context2.next = 38;
          return createRasxodDocService(_objectSpread(_objectSpread({}, data), {}, {
            user_id: user_id,
            account_number_id: account_number_id
          }));
        case 38:
          result = _context2.sent;
          return _context2.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, null, result));
        case 42:
          _context2.prev = 42;
          _context2.t1 = _context2["catch"](0);
          errorCatch(_context2.t1, res);
        case 45:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 42], [20, 30, 33, 36]]);
  }));
  return function createRasxod(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getRasxod = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var user_id, _validationResponse2, from, to, account_number_id, page, limit, batalon_id, offset, _yield$getRasxodServi, total, data, summa_from, summa_to, summa, pageCount, meta;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user_id = req.user.id;
          _validationResponse2 = validationResponse(rasxodQueryValidation, req.query), from = _validationResponse2.from, to = _validationResponse2.to, account_number_id = _validationResponse2.account_number_id, page = _validationResponse2.page, limit = _validationResponse2.limit, batalon_id = _validationResponse2.batalon_id;
          _context3.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          if (!batalon_id) {
            _context3.next = 8;
            break;
          }
          _context3.next = 8;
          return getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
        case 8:
          offset = (page - 1) * limit;
          _context3.next = 11;
          return getRasxodService(user_id, account_number_id, from, to, offset, limit, batalon_id);
        case 11:
          _yield$getRasxodServi = _context3.sent;
          total = _yield$getRasxodServi.total;
          data = _yield$getRasxodServi.data;
          summa_from = _yield$getRasxodServi.summa_from;
          summa_to = _yield$getRasxodServi.summa_to;
          summa = _yield$getRasxodServi.summa;
          pageCount = Math.ceil(total / limit);
          meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            summa_from: returnStringSumma(summa_from),
            summa_to: returnStringSumma(summa_to),
            summa: returnStringSumma(summa)
          };
          return _context3.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, meta, data));
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          errorCatch(_context3.t0, res);
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function getRasxod(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getByIdRasxod = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var user_id, account_number_id, id, data;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          _context4.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          id = req.params.id;
          _context4.next = 8;
          return getByIdRasxodService(user_id, account_number_id, id, true, req.i18n);
        case 8:
          data = _context4.sent;
          return _context4.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, null, data));
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          errorCatch(_context4.t0, res);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return function getByIdRasxod(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deeleteRasxod = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user_id, account_number_id, id;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          id = req.params.id;
          _context5.next = 6;
          return getByIdRasxodService(user_id, account_number_id, id, null, req.i18n);
        case 6:
          _context5.next = 8;
          return deeleteRasxodService(id);
        case 8:
          return _context5.abrupt("return", res.success(req.i18n.t("deleteSuccess"), 200));
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          errorCatch(_context5.t0, res);
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function deeleteRasxod(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var updateRasxod = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var user_id, account_number_id, id, _req$body2, batalon_account_number_id, batalon_gazna_number_id, oldData, data, batalon, check, _check2, _iterator2, _step2, _loop, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          id = req.params.id;
          _req$body2 = req.body, batalon_account_number_id = _req$body2.batalon_account_number_id, batalon_gazna_number_id = _req$body2.batalon_gazna_number_id;
          _context7.next = 7;
          return getByIdRasxodService(user_id, account_number_id, id, null, req.i18n);
        case 7:
          oldData = _context7.sent;
          data = validationResponse(rasxodValidation, req.body);
          _context7.next = 11;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 11:
          _context7.next = 13;
          return getByIdBatalonService(user_id, data.batalon_id, true, null, req.i18n);
        case 13:
          batalon = _context7.sent;
          if (!batalon_account_number_id) {
            _context7.next = 18;
            break;
          }
          check = batalon.account_numbers.find(function (item) {
            return item.id === batalon_account_number_id;
          });
          if (check) {
            _context7.next = 18;
            break;
          }
          return _context7.abrupt("return", res.error(req.i18n.t("accountNumberNotFound"), 404));
        case 18:
          if (!batalon_gazna_number_id) {
            _context7.next = 22;
            break;
          }
          _check2 = batalon.gazna_numbers.find(function (item) {
            return item.id === batalon_gazna_number_id;
          });
          if (_check2) {
            _context7.next = 22;
            break;
          }
          return _context7.abrupt("return", res.error(req.i18n.t("gaznaNumberNotFound"), 404));
        case 22:
          _iterator2 = _createForOfIteratorHelper(data.tasks);
          _context7.prev = 23;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var task, test;
            return _regeneratorRuntime().wrap(function _loop$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  task = _step2.value;
                  test = oldData.tasks.find(function (item) {
                    return item.task_id === task.task_id;
                  });
                  if (!(!test || oldData.batalon_id !== data.batalon_id)) {
                    _context6.next = 5;
                    break;
                  }
                  _context6.next = 5;
                  return getByIdTaskService(data.batalon_id, task.task_id, user_id, req.i18n);
                case 5:
                case "end":
                  return _context6.stop();
              }
            }, _loop);
          });
          _iterator2.s();
        case 26:
          if ((_step2 = _iterator2.n()).done) {
            _context7.next = 30;
            break;
          }
          return _context7.delegateYield(_loop(), "t0", 28);
        case 28:
          _context7.next = 26;
          break;
        case 30:
          _context7.next = 35;
          break;
        case 32:
          _context7.prev = 32;
          _context7.t1 = _context7["catch"](23);
          _iterator2.e(_context7.t1);
        case 35:
          _context7.prev = 35;
          _iterator2.f();
          return _context7.finish(35);
        case 38:
          _context7.next = 40;
          return updateRasxodService(_objectSpread(_objectSpread({}, data), {}, {
            id: id
          }));
        case 40:
          result = _context7.sent;
          return _context7.abrupt("return", res.success(req.i18n.t("updateSuccess"), 200, null, result));
        case 44:
          _context7.prev = 44;
          _context7.t2 = _context7["catch"](0);
          errorCatch(_context7.t2, res);
        case 47:
        case "end":
          return _context7.stop();
      }
    }, _callee6, null, [[0, 44], [23, 32, 35, 38]]);
  }));
  return function updateRasxod(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var exportExcelData = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var user_id, _validationResponse3, from, to, account_number_id, batalon_id, _yield$getRasxodServi2, total, data, summa_from, summa_to, workbook, file_name, worksheet, titleCell, summa_fromCell, periodCell, doc_numCell, doc_dateCell, clientCell, innCell, rasxod_sumCell, commentCell, row_number, _iterator3, _step3, rasxod, _doc_numCell, _doc_dateCell, _clientCell, _innCell, _rasxod_sumCell, _commentCell, _css_array, itogo_stringCell, itogoCell, summa_toCell, css_array, filePath;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          user_id = req.user.id;
          _validationResponse3 = validationResponse(rasxodQueryValidation, req.query), from = _validationResponse3.from, to = _validationResponse3.to, account_number_id = _validationResponse3.account_number_id, batalon_id = _validationResponse3.batalon_id;
          _context8.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          if (!batalon_id) {
            _context8.next = 8;
            break;
          }
          _context8.next = 8;
          return getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
        case 8:
          _context8.next = 10;
          return getRasxodService(user_id, account_number_id, from, to, null, null, batalon_id);
        case 10:
          _yield$getRasxodServi2 = _context8.sent;
          total = _yield$getRasxodServi2.total;
          data = _yield$getRasxodServi2.data;
          summa_from = _yield$getRasxodServi2.summa_from;
          summa_to = _yield$getRasxodServi2.summa_to;
          workbook = new ExcelJS.Workbook();
          file_name = "rasxod_birgada_".concat(new Date().getTime(), ".xlsx");
          worksheet = workbook.addWorksheet("rasxod_docs_".concat(total));
          worksheet.pageSetup.margins.left = 0.5;
          worksheet.pageSetup.margins.header = 0.5;
          worksheet.pageSetup.margins.footer = 0.5;
          worksheet.pageSetup.margins.right = 0.5;
          worksheet.mergeCells("A1", "F1");
          worksheet.mergeCells("A2", "F2");
          worksheet.mergeCells("A3", "F3");
          titleCell = worksheet.getCell("A1");
          summa_fromCell = worksheet.getCell("A2");
          periodCell = worksheet.getCell("A3");
          doc_numCell = worksheet.getCell("A4");
          doc_dateCell = worksheet.getCell("B4");
          clientCell = worksheet.getCell("C4");
          innCell = worksheet.getCell("D4");
          rasxod_sumCell = worksheet.getCell("E4");
          commentCell = worksheet.getCell("F4");
          titleCell.value = "\u04B2\u0430\u043C\u043A\u043E\u0440 \u0442\u0430\u0448\u043A\u0438\u043B\u043E\u0442\u043B\u0430\u0440 \u0443\u0447\u0443\u043D \u049B\u0438\u043B\u0438\u043D\u0433\u0430\u043D \u0447\u0438\u049B\u0438\u043C\u043B\u0430\u0440";
          periodCell.value = "".concat(returnStringDate(new Date(from)), " \u0434\u0430\u043D ").concat(returnStringDate(new Date(to)), " \u0433\u0430\u0447\u0430 \u0431\u045E\u043B\u0433\u0430\u043D \u0447\u0438\u049B\u0438\u043C\u043B\u0430\u0440");
          summa_fromCell.value = "".concat(returnStringDate(new Date(from)), " \u0433\u0430\u0447\u0430 \u0431\u045E\u043B\u0433\u0430\u043D \u0447\u0438\u049B\u0438\u043C\u043B\u0430\u0440 \u0436\u0430\u043C\u0438 : ").concat(returnStringSumma(summa_from));
          doc_numCell.value = "Ҳужжат рақами";
          doc_dateCell.value = "\u04B2\u0443\u0436\u0436\u0430\u0442 \u0441\u0430\u043D\u0430\u0441\u0438";
          clientCell.value = "\u04B2\u0430\u043C\u043A\u043E\u0440 \u0442\u0430\u0448\u043A\u0438\u043B\u043E\u0442";
          innCell.value = "\u04B2\u0430\u043C\u043A\u043E\u0440 \u0438\u043D\u043D";
          rasxod_sumCell.value = "\u0422\u045E\u043B\u0430\u043D\u0433\u0430\u043D \u043F\u0443\u043B \u043C\u0430\u0431\u043B\u0430\u0493\u0438";
          commentCell.value = "\u0422\u0430\u0432\u0441\u0438\u0444";
          row_number = 5;
          _iterator3 = _createForOfIteratorHelper(data);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              rasxod = _step3.value;
              _doc_numCell = worksheet.getCell("A".concat(row_number));
              _doc_dateCell = worksheet.getCell("B".concat(row_number));
              _clientCell = worksheet.getCell("C".concat(row_number));
              _innCell = worksheet.getCell("D".concat(row_number));
              _rasxod_sumCell = worksheet.getCell("E".concat(row_number));
              _commentCell = worksheet.getCell("F".concat(row_number));
              _doc_numCell.value = rasxod.doc_num;
              _doc_dateCell.value = returnStringDate(new Date(rasxod.doc_date));
              _clientCell.value = rasxod.batalon_name;
              _innCell.value = rasxod.batalon_str;
              _rasxod_sumCell.value = rasxod.summa;
              _commentCell.value = rasxod.opisanie;
              _css_array = [_doc_dateCell, _doc_numCell, _clientCell, _innCell, _commentCell, _rasxod_sumCell];
              _css_array.forEach(function (element, index) {
                var horizontal = "center";
                var bold = true;
                var size = 8;
                if (index === 4) horizontal = "left";
                if (index === 5) horizontal = "right";
                Object.assign(element, {
                  numFmt: "#,##0.00",
                  font: {
                    size: size,
                    name: "Times New Roman",
                    bold: bold
                  },
                  alignment: {
                    vertical: "middle",
                    horizontal: horizontal,
                    wrapText: true
                  },
                  fill: {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: {
                      argb: "FFFFFFFF"
                    }
                  },
                  border: {
                    top: {
                      style: "thin"
                    },
                    left: {
                      style: "thin"
                    },
                    bottom: {
                      style: "thin"
                    },
                    right: {
                      style: "thin"
                    }
                  }
                });
              });
              row_number++;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          worksheet.mergeCells("A".concat(row_number), "D".concat(row_number));
          worksheet.mergeCells("A".concat(row_number + 1), "F".concat(row_number + 1));
          itogo_stringCell = worksheet.getCell("A".concat(row_number));
          itogoCell = worksheet.getCell("E".concat(row_number));
          summa_toCell = worksheet.getCell("A".concat(row_number + 1));
          itogo_stringCell.value = "".concat(returnStringDate(new Date(from)), " \u0434\u0430\u043D ").concat(returnStringDate(new Date(to)), "-\u0433\u0430\u0447\u0430 \u0431\u045E\u043B\u0433\u0430\u043D  \u0438\u0442\u043E\u0433\u043E :");
          itogoCell.value = summa_to;
          summa_toCell.value = "".concat(returnStringDate(new Date(to)), " \u0433\u0430\u0447\u0430 \u0431\u045E\u043B\u0433\u0430\u043D \u0447\u0438\u049B\u0438\u043C\u043B\u0430\u0440 \u0436\u0430\u043C\u0438 : ").concat(returnStringSumma(summa_to));
          css_array = [titleCell, summa_fromCell, periodCell, doc_dateCell, doc_numCell, clientCell, innCell, commentCell, rasxod_sumCell, itogo_stringCell, itogoCell, summa_toCell];
          css_array.forEach(function (element, index) {
            var horizontal = "center";
            var bold = true;
            var size = 10;
            var fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: {
                argb: "FFFFFFFF"
              }
            };
            var border = {
              top: {
                style: "thin"
              },
              left: {
                style: "thin"
              },
              bottom: {
                style: "thin"
              },
              right: {
                style: "thin"
              }
            };
            if (index === 1 || index === 2 || index === 9 || index === 11) horizontal = "left";
            if (index === 10) size = 8, horizontal = "right";
            if (index === 9 || index === 10 || index === 0 || index === 1 || index === 2 || index === 11) fill = {}, border = {};
            Object.assign(element, {
              numFmt: "#,#00.00",
              font: {
                size: size,
                name: "Times New Roman",
                bold: bold
              },
              alignment: {
                vertical: "middle",
                horizontal: horizontal,
                wrapText: true
              },
              fill: fill,
              border: border
            });
          });
          worksheet.getRow(1).height = 50;
          worksheet.getRow(2).height = 35;
          worksheet.getRow(3).height = 30;
          worksheet.getColumn(1).width = 10;
          worksheet.getColumn(2).width = 13;
          worksheet.getColumn(3).width = 15;
          worksheet.getColumn(4).width = 20;
          worksheet.getColumn(5).width = 15;
          worksheet.getColumn(6).width = 15;
          worksheet.getColumn(7).width = 13;
          worksheet.getRow(itogoCell.row).height = 30;
          worksheet.getRow(summa_toCell.row).height = 30;
          filePath = path.join(__dirname, "../../public/exports/" + file_name);
          _context8.next = 71;
          return workbook.xlsx.writeFile(filePath);
        case 71:
          return _context8.abrupt("return", res.download(filePath, function (err) {
            if (err) {
              throw new ErrorResponse(err, err.statusCode);
            }
          }));
        case 74:
          _context8.prev = 74;
          _context8.t0 = _context8["catch"](0);
          errorCatch(_context8.t0, res);
        case 77:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[0, 74]]);
  }));
  return function exportExcelData(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var exportRasoxBYId = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var user_id, account_number_id, id, data;
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          _context9.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          id = req.params.id;
          _context9.next = 8;
          return getByIdRasxodService(user_id, account_number_id, id, true, req.i18n);
        case 8:
          data = _context9.sent;
          _context9.next = 14;
          break;
        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          errorCatch(_context9.t0, res);
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee8, null, [[0, 11]]);
  }));
  return function exportRasoxBYId(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var forPdfData = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var user_id, _validationResponse4, from, to, account_number_id, batalon_id, data;
    return _regeneratorRuntime().wrap(function _callee9$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          user_id = req.user.id;
          _validationResponse4 = validationResponse(rasxodQueryValidation, req.query), from = _validationResponse4.from, to = _validationResponse4.to, account_number_id = _validationResponse4.account_number_id, batalon_id = _validationResponse4.batalon_id;
          _context10.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          if (!batalon_id) {
            _context10.next = 8;
            break;
          }
          _context10.next = 8;
          return getByIdBatalonService(user_id, batalon_id, true, null, req.i18n);
        case 8:
          _context10.next = 10;
          return getRasxodService(user_id, account_number_id, from, to, null, null, batalon_id);
        case 10:
          data = _context10.sent;
          return _context10.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, null, data));
        case 14:
          _context10.prev = 14;
          _context10.t0 = _context10["catch"](0);
          errorCatch(_context10.t0, res);
        case 17:
        case "end":
          return _context10.stop();
      }
    }, _callee9, null, [[0, 14]]);
  }));
  return function forPdfData(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
module.exports = {
  getPaymentRequest: getPaymentRequest,
  createRasxod: createRasxod,
  getRasxod: getRasxod,
  getByIdRasxod: getByIdRasxod,
  deeleteRasxod: deeleteRasxod,
  updateRasxod: updateRasxod,
  exportExcelData: exportExcelData,
  exportRasoxBYId: exportRasoxBYId,
  forPdfData: forPdfData
};