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
var _require = require("../utils/validation"),
  prixodValidation = _require.prixodValidation,
  prixodQueryValidation = _require.prixodQueryValidation;
var _require2 = require("../utils/response.validation"),
  validationResponse = _require2.validationResponse;
var _require3 = require("../utils/errorCatch"),
  errorCatch = _require3.errorCatch;
var ErrorResponse = require("../utils/errorResponse");
var _require4 = require("../contract/db"),
  getByIdcontractService = _require4.getByIdcontractService;
var _require5 = require("../spravochnik/account.number/account.number.service"),
  getByIdaccount_numberService = _require5.getByIdaccount_numberService;
var ExcelJS = require("exceljs");
var path = require("path");
var _require6 = require("../utils/return.summa"),
  returnStringSumma = _require6.returnStringSumma;
var _require7 = require("../utils/date.functions"),
  returnStringDate = _require7.returnStringDate;
var _require8 = require("./service"),
  prixodCreateService = _require8.prixodCreateService,
  getPrixodService = _require8.getPrixodService,
  getByIdPrixodService = _require8.getByIdPrixodService,
  updatePrixodService = _require8.updatePrixodService,
  deletePrixodService = _require8.deletePrixodService,
  PrixodService = _require8.PrixodService;
var _require9 = require("@organization/service"),
  OrganizationService = _require9.OrganizationService;
var prixodCreate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var user_id, account_number_id, _req$body, organization_id, organ_account_number_id, organ_gazna_number_id, data, organization, check, _check, contract, prixod;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          _req$body = req.body, organization_id = _req$body.organization_id, organ_account_number_id = _req$body.organ_account_number_id, organ_gazna_number_id = _req$body.organ_gazna_number_id;
          _context.next = 6;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 6:
          data = validationResponse(prixodValidation, req.body);
          _context.next = 9;
          return OrganizationService.getById({
            user_id: user_id,
            id: organization_id
          });
        case 9:
          organization = _context.sent;
          if (organization) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", res.error(req.i18n.t("organizationNotFound"), 404));
        case 12:
          if (!organ_account_number_id) {
            _context.next = 16;
            break;
          }
          check = organization.account_numbers.find(function (item) {
            return item.id === organ_account_number_id;
          });
          if (check) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", res.error(req.i18n.t("accountNumberNotFound"), 404));
        case 16:
          if (!organ_gazna_number_id) {
            _context.next = 20;
            break;
          }
          _check = organization.gazna_numbers.find(function (item) {
            return item.id === organ_gazna_number_id;
          });
          if (_check) {
            _context.next = 20;
            break;
          }
          return _context.abrupt("return", res.error(req.i18n.t("gaznaNumberNotFound"), 404));
        case 20:
          _context.next = 22;
          return getByIdcontractService(user_id, data.contract_id, false, account_number_id, data.organization_id, req.i18n);
        case 22:
          contract = _context.sent;
          if (!(contract.remaining_balance < data.summa)) {
            _context.next = 25;
            break;
          }
          throw new ErrorResponse(req.i18n.t("prixodSummaError"), 400);
        case 25:
          _context.next = 27;
          return prixodCreateService(_objectSpread(_objectSpread({}, data), {}, {
            account_number_id: account_number_id,
            user_id: user_id
          }));
        case 27:
          prixod = _context.sent;
          return _context.abrupt("return", res.success(req.i18n.t("createSuccess"), 201, null, prixod));
        case 31:
          _context.prev = 31;
          _context.t0 = _context["catch"](0);
          errorCatch(_context.t0, res);
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 31]]);
  }));
  return function prixodCreate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getByIdPrixod = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var user_id, id, account_number_id, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          account_number_id = req.query.account_number_id;
          _context2.next = 6;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 6:
          _context2.next = 8;
          return getByIdPrixodService(user_id, id, account_number_id, true, req.i18n);
        case 8:
          data = _context2.sent;
          data.summa = Math.round(data.summa * 100) / 100;
          return _context2.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, null, data));
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          errorCatch(_context2.t0, res);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function getByIdPrixod(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getPrixod = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _validationResponse, page, limit, search, from, to, account_number_id, organization_id, user_id, offset, _yield$getPrixodServi, data, total, from_balance, to_balance, summa, pageCount, meta;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _validationResponse = validationResponse(prixodQueryValidation, req.query), page = _validationResponse.page, limit = _validationResponse.limit, search = _validationResponse.search, from = _validationResponse.from, to = _validationResponse.to, account_number_id = _validationResponse.account_number_id, organization_id = _validationResponse.organization_id;
          user_id = req.user.id;
          _context3.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          offset = (page - 1) * limit;
          _context3.next = 8;
          return getPrixodService(user_id, from, to, offset, limit, account_number_id, search, organization_id);
        case 8:
          _yield$getPrixodServi = _context3.sent;
          data = _yield$getPrixodServi.data;
          total = _yield$getPrixodServi.total;
          from_balance = _yield$getPrixodServi.from_balance;
          to_balance = _yield$getPrixodServi.to_balance;
          summa = _yield$getPrixodServi.summa;
          pageCount = Math.ceil(total / limit);
          meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(from_balance) || 0,
            to_balance: returnStringSumma(to_balance) || 0,
            summa: returnStringSumma(summa) || 0
          };
          return _context3.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, meta, data));
        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          errorCatch(_context3.t0, res);
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 19]]);
  }));
  return function getPrixod(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updatePrixod = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var user_id, id, account_number_id, _req$body2, organization_id, organ_account_number_id, organ_gazna_number_id, data, oldData, organization, check, _check2, contract, check_doc, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          account_number_id = req.query.account_number_id;
          _req$body2 = req.body, organization_id = _req$body2.organization_id, organ_account_number_id = _req$body2.organ_account_number_id, organ_gazna_number_id = _req$body2.organ_gazna_number_id;
          data = validationResponse(prixodValidation, req.body);
          _context4.next = 8;
          return getByIdPrixodService(user_id, id, account_number_id, null, req.i18n);
        case 8:
          oldData = _context4.sent;
          _context4.next = 11;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 11:
          _context4.next = 13;
          return OrganizationService.getById({
            user_id: user_id,
            id: organization_id
          });
        case 13:
          organization = _context4.sent;
          if (organization) {
            _context4.next = 16;
            break;
          }
          return _context4.abrupt("return", res.error(req.i18n.t("organizationNotFound"), 404));
        case 16:
          if (!organ_account_number_id) {
            _context4.next = 20;
            break;
          }
          check = organization.account_numbers.find(function (item) {
            return item.id === organ_account_number_id;
          });
          if (check) {
            _context4.next = 20;
            break;
          }
          return _context4.abrupt("return", res.error(req.i18n.t("accountNumberNotFound"), 404));
        case 20:
          if (!organ_gazna_number_id) {
            _context4.next = 24;
            break;
          }
          _check2 = organization.gazna_numbers.find(function (item) {
            return item.id === organ_gazna_number_id;
          });
          if (_check2) {
            _context4.next = 24;
            break;
          }
          return _context4.abrupt("return", res.error(req.i18n.t("gaznaNumberNotFound"), 404));
        case 24:
          _context4.next = 26;
          return getByIdcontractService(user_id, data.contract_id, false, account_number_id, data.organization_id, req.i18n);
        case 26:
          contract = _context4.sent;
          _context4.next = 29;
          return PrixodService.checkDocs({
            contract_id: contract.id
          });
        case 29:
          check_doc = _context4.sent;
          if (!check_doc.length) {
            _context4.next = 32;
            break;
          }
          return _context4.abrupt("return", res.error(req.i18n.t("docExists"), 400, {
            docs: check_doc
          }));
        case 32:
          if (!(contract.remaining_balance + oldData.prixod_summa < data.summa)) {
            _context4.next = 34;
            break;
          }
          throw new ErrorResponse(req.i18n.t("prixodSummaError"), 400);
        case 34:
          _context4.next = 36;
          return updatePrixodService(_objectSpread(_objectSpread({}, data), {}, {
            id: id
          }));
        case 36:
          result = _context4.sent;
          return _context4.abrupt("return", res.success(req.i18n.t("updateSuccess"), 200, null, result));
        case 40:
          _context4.prev = 40;
          _context4.t0 = _context4["catch"](0);
          errorCatch(_context4.t0, res);
        case 43:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 40]]);
  }));
  return function updatePrixod(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deletePrixod = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user_id, id, account_number_id, doc, check_doc;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          account_number_id = req.query.account_number_id;
          _context5.next = 6;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 6:
          _context5.next = 8;
          return getByIdPrixodService(user_id, id, account_number_id, true, req.i18n);
        case 8:
          doc = _context5.sent;
          _context5.next = 11;
          return PrixodService.checkDocs({
            contract_id: doc.contract_id
          });
        case 11:
          check_doc = _context5.sent;
          if (!check_doc.length) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.error(req.i18n.t("docExists"), 400, {
            docs: check_doc
          }));
        case 14:
          _context5.next = 16;
          return deletePrixodService(id);
        case 16:
          return _context5.abrupt("return", res.success(req.i18n.t("deleteSuccess"), 200));
        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          errorCatch(_context5.t0, res);
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 19]]);
  }));
  return function deletePrixod(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var exportExcelData = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _validationResponse2, search, from, to, account_number_id, organization_id, user_id, _yield$getPrixodServi2, data, total, from_balance, to_balance, summa, workbook, file_name, worksheet, titleCell, summa_fromCell, prixodCell, doc_numCell, doc_dateCell, clientCell, innCell, prixod_sumCell, prixod_dateCell, row_number, _iterator, _step, prixod, _doc_numCell, _doc_dateCell, _clientCell, _innCell, _prixod_sumCell, _prixod_dateCell, _css_array, itogo_stringCell, itogoCell, summa_toCell, css_array, filePath;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _validationResponse2 = validationResponse(prixodQueryValidation, req.query), search = _validationResponse2.search, from = _validationResponse2.from, to = _validationResponse2.to, account_number_id = _validationResponse2.account_number_id, organization_id = _validationResponse2.organization_id;
          user_id = req.user.id;
          _context6.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          _context6.next = 7;
          return getPrixodService(user_id, from, to, null, null, account_number_id, search, organization_id);
        case 7:
          _yield$getPrixodServi2 = _context6.sent;
          data = _yield$getPrixodServi2.data;
          total = _yield$getPrixodServi2.total;
          from_balance = _yield$getPrixodServi2.from_balance;
          to_balance = _yield$getPrixodServi2.to_balance;
          summa = _yield$getPrixodServi2.summa;
          workbook = new ExcelJS.Workbook();
          file_name = "prixod_".concat(new Date().getTime(), ".xlsx");
          worksheet = workbook.addWorksheet("prixod_docs_".concat(total));
          worksheet.pageSetup.margins.left = 0.5;
          worksheet.pageSetup.margins.header = 0.5;
          worksheet.pageSetup.margins.footer = 0.5;
          worksheet.pageSetup.margins.right = 0.5;
          worksheet.mergeCells("A1", "F1");
          worksheet.mergeCells("A2", "F2");
          worksheet.mergeCells("A3", "F3");
          titleCell = worksheet.getCell("A1");
          summa_fromCell = worksheet.getCell("A2");
          prixodCell = worksheet.getCell("A3");
          doc_numCell = worksheet.getCell("A4");
          doc_dateCell = worksheet.getCell("B4");
          clientCell = worksheet.getCell("C4");
          innCell = worksheet.getCell("D4");
          prixod_sumCell = worksheet.getCell("E4");
          prixod_dateCell = worksheet.getCell("F4");
          titleCell.value = "\u041E\u043C\u043C\u0430\u0432\u0438\u0439 \u0442\u0430\u0434\u0431\u0438\u0440\u043B\u0430\u0440\u0434\u0430\u043D \u0442\u0443\u0448\u0433\u0430\u043D \u0442\u0443\u0448\u0443\u043C\u043B\u0430\u0440";
          prixodCell.value = "".concat(returnStringDate(new Date(from)), " \u0434\u0430\u043D ").concat(returnStringDate(new Date(to)), " \u0433\u0430\u0447\u0430 \u0431\u045E\u043B\u0433\u0430\u043D \u0442\u0443\u0448\u0443\u043C\u043B\u0430\u0440");
          summa_fromCell.value = "".concat(returnStringDate(new Date(from)), " \u0433\u0430\u0447\u0430 \u0431\u045E\u043B\u0433\u0430\u043D \u0442\u0443\u0448\u0443\u043C\u043B\u0430\u0440 \u0436\u0430\u043C\u0438 : ").concat(returnStringSumma(from_balance));
          doc_numCell.value = "Шартнома рақами";
          doc_dateCell.value = "\u0428\u0430\u0440\u0442\u043D\u043E\u043C\u0430 \u0441\u0430\u043D\u0430\u0441\u0438";
          clientCell.value = "\u04B2\u0430\u043C\u043A\u043E\u0440 \u0442\u0430\u0448\u043A\u0438\u043B\u043E\u0442";
          innCell.value = "\u04B2\u0430\u043C\u043A\u043E\u0440 \u0438\u043D\u043D";
          prixod_sumCell.value = "\u0422\u045E\u043B\u0430\u043D\u0433\u0430\u043D \u043F\u0443\u043B \u043C\u0430\u0431\u043B\u0430\u0493\u0438";
          prixod_dateCell.value = "\u0422\u045E\u043B\u0430\u043D\u0433\u0430\u043D \u043F\u0443\u043B \u0441\u0430\u043D\u0430\u0441\u0438";
          row_number = 5;
          _iterator = _createForOfIteratorHelper(data);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              prixod = _step.value;
              _doc_numCell = worksheet.getCell("A".concat(row_number));
              _doc_dateCell = worksheet.getCell("B".concat(row_number));
              _clientCell = worksheet.getCell("C".concat(row_number));
              _innCell = worksheet.getCell("D".concat(row_number));
              _prixod_sumCell = worksheet.getCell("E".concat(row_number));
              _prixod_dateCell = worksheet.getCell("F".concat(row_number));
              _doc_numCell.value = prixod.contract_doc_num;
              _doc_dateCell.value = returnStringDate(new Date(prixod.contract_doc_date));
              _clientCell.value = prixod.organization_name;
              _innCell.value = prixod.organization_str;
              _prixod_sumCell.value = prixod.prixod_summa;
              _prixod_dateCell.value = returnStringDate(new Date(prixod.prixod_date));
              _css_array = [_doc_dateCell, _doc_numCell, _clientCell, _innCell, _prixod_dateCell, _prixod_sumCell];
              _css_array.forEach(function (element, index) {
                var horizontal = "center";
                var bold = true;
                var size = 8;
                if (index === 2) horizontal = "left";
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
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          worksheet.mergeCells("A".concat(row_number), "D".concat(row_number));
          worksheet.mergeCells("A".concat(row_number + 1), "F".concat(row_number + 1));
          itogo_stringCell = worksheet.getCell("A".concat(row_number));
          itogoCell = worksheet.getCell("E".concat(row_number));
          summa_toCell = worksheet.getCell("A".concat(row_number + 1));
          itogo_stringCell.value = "".concat(returnStringDate(new Date(from)), " \u0434\u0430\u043D ").concat(returnStringDate(new Date(to)), "-\u0433\u0430\u0447\u0430 \u0431\u045E\u043B\u0433\u0430\u043D  \u0438\u0442\u043E\u0433\u043E :");
          itogoCell.value = summa;
          summa_toCell.value = "".concat(returnStringDate(new Date(to)), " \u0433\u0430\u0447\u0430 \u0431\u045E\u043B\u0433\u0430\u043D \u0442\u0443\u0448\u0443\u043C\u043B\u0430\u0440 \u0436\u0430\u043C\u0438 : ").concat(returnStringSumma(to_balance));
          css_array = [titleCell, summa_fromCell, prixodCell, doc_dateCell, doc_numCell, clientCell, innCell, prixod_dateCell, prixod_sumCell, itogo_stringCell, itogoCell, summa_toCell];
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
          _context6.next = 69;
          return workbook.xlsx.writeFile(filePath);
        case 69:
          return _context6.abrupt("return", res.download(filePath, function (err) {
            if (err) {
              throw new ErrorResponse(err, err.statusCode);
            }
          }));
        case 72:
          _context6.prev = 72;
          _context6.t0 = _context6["catch"](0);
          errorCatch(_context6.t0, res);
        case 75:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 72]]);
  }));
  return function exportExcelData(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var forPdfData = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _validationResponse3, search, from, to, account_number_id, organization_id, user_id, data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _validationResponse3 = validationResponse(prixodQueryValidation, req.query), search = _validationResponse3.search, from = _validationResponse3.from, to = _validationResponse3.to, account_number_id = _validationResponse3.account_number_id, organization_id = _validationResponse3.organization_id;
          user_id = req.user.id;
          _context7.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          _context7.next = 7;
          return getPrixodService(user_id, from, to, null, null, account_number_id, search, organization_id);
        case 7:
          data = _context7.sent;
          return _context7.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, null, data));
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          errorCatch(_context7.t0, res);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function forPdfData(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
module.exports = {
  prixodCreate: prixodCreate,
  getPrixod: getPrixod,
  getByIdPrixod: getByIdPrixod,
  updatePrixod: updatePrixod,
  deletePrixod: deletePrixod,
  exportExcelData: exportExcelData,
  forPdfData: forPdfData
};