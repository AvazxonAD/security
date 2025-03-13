"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("./service"),
  ContractService = _require.ContractService;

// exports.Controller = class {
//     static async create(req, res) {
//         const user_id = req.user.id
//         const { account_number_id } = req.query;
//         const { organization_id, organ_account_number_id, gazna_number_id } = req.body;

//         await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)
//         const { error, value: data } = contractValidation.validate(req.body);
//         if (error) {
//             return res.error(req.i18n.t('validationError'), 400, error.details[0].message);
//         }

//         const organization = await getByIdorganizationService(user_id, data.organization_id, null, req.i18n);

//         for (let task of data.tasks) {
//             await getByIdBatalonService(user_id, task.batalon_id, null, null, req.i18n);
//             const bxm = await getByIdBxmService(user_id, task.bxm_id, req.i18n)
//             task.bxm_summa = bxm.bxm_07;
//         }

//         const result = await contractCreateService({ ...data, user_id, account_number_id })
//
//     }
// }

var _require2 = require("./db"),
  contractCreateService = _require2.contractCreateService,
  getcontractService = _require2.getcontractService,
  getByIdcontractService = _require2.getByIdcontractService,
  contractUpdateService = _require2.contractUpdateService,
  deleteContractService = _require2.deleteContractService,
  dataForExcelService = _require2.dataForExcelService,
  contractViewService = _require2.contractViewService;
var _require3 = require("../utils/validation"),
  contractValidation = _require3.contractValidation,
  conrtactQueryValidation = _require3.conrtactQueryValidation,
  contractUpdateValidation = _require3.contractUpdateValidation;
var _require4 = require("../utils/response.validation"),
  validationResponse = _require4.validationResponse;
var _require5 = require("../utils/errorCatch"),
  errorCatch = _require5.errorCatch;
var _require6 = require("../batalon/db"),
  getByIdBatalonService = _require6.getByIdBatalonService,
  getBatalonService = _require6.getBatalonService;
var _require7 = require("../organization/organization.service"),
  getByIdorganizationService = _require7.getByIdorganizationService;
var _require8 = require("../spravochnik/account.number/account.number.service"),
  getByIdaccount_numberService = _require8.getByIdaccount_numberService;
var _require9 = require("../spravochnik/bxm/db"),
  getByIdBxmService = _require9.getByIdBxmService;
var _require10 = require("../utils/return.summa"),
  returnStringSumma = _require10.returnStringSumma;
var _require11 = require("../utils/date.functions"),
  returnStringDate = _require11.returnStringDate;
var ExcelJs = require("exceljs");
var path = require("path");
var pg = require("pg");
var pool = require("../config/db");
var ErrorResponse = require("../utils/errorResponse");
var xlsx = require("xlsx");
exports.contractCreate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var user_id, account_number_id, _req$body, organ_account_number_id, gazna_number_id, _contractValidation$v, error, data, organization, check, _check, _iterator, _step, task, bxm, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          _req$body = req.body, organ_account_number_id = _req$body.organ_account_number_id, gazna_number_id = _req$body.gazna_number_id;
          _context.next = 6;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 6:
          _contractValidation$v = contractValidation.validate(req.body), error = _contractValidation$v.error, data = _contractValidation$v.value;
          if (!error) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.error(req.i18n.t("validationError"), 400, error.details[0].message));
        case 9:
          _context.next = 11;
          return getByIdorganizationService(user_id, data.organization_id, null, req.i18n);
        case 11:
          organization = _context.sent;
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
          if (!gazna_number_id) {
            _context.next = 20;
            break;
          }
          _check = organization.gazna_numbers.find(function (item) {
            return item.id === gazna_number_id;
          });
          if (_check) {
            _context.next = 20;
            break;
          }
          return _context.abrupt("return", res.error(req.i18n.t("gaznaNumberNotFound"), 404));
        case 20:
          _iterator = _createForOfIteratorHelper(data.tasks);
          _context.prev = 21;
          _iterator.s();
        case 23:
          if ((_step = _iterator.n()).done) {
            _context.next = 33;
            break;
          }
          task = _step.value;
          _context.next = 27;
          return getByIdBatalonService(user_id, task.batalon_id, null, null, req.i18n);
        case 27:
          _context.next = 29;
          return getByIdBxmService(user_id, task.bxm_id, req.i18n);
        case 29:
          bxm = _context.sent;
          task.bxm_summa = bxm.bxm_07;
        case 31:
          _context.next = 23;
          break;
        case 33:
          _context.next = 38;
          break;
        case 35:
          _context.prev = 35;
          _context.t0 = _context["catch"](21);
          _iterator.e(_context.t0);
        case 38:
          _context.prev = 38;
          _iterator.f();
          return _context.finish(38);
        case 41:
          _context.next = 43;
          return contractCreateService(_objectSpread(_objectSpread({}, data), {}, {
            user_id: user_id,
            account_number_id: account_number_id
          }));
        case 43:
          result = _context.sent;
          return _context.abrupt("return", res.success(req.i18n.t("createSuccess"), 201, null, result));
        case 47:
          _context.prev = 47;
          _context.t1 = _context["catch"](0);
          errorCatch(_context.t1, res);
        case 50:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 47], [21, 35, 38, 41]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.contractGet = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var user_id, _validationResponse, page, limit, search, from, to, account_number_id, organization_id, batalon_id, offset, _yield$getcontractSer, data, total, from_balance, to_balance, _iterator2, _step2, doc, pageCount, meta;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user_id = req.user.id;
          _validationResponse = validationResponse(conrtactQueryValidation, req.query), page = _validationResponse.page, limit = _validationResponse.limit, search = _validationResponse.search, from = _validationResponse.from, to = _validationResponse.to, account_number_id = _validationResponse.account_number_id, organization_id = _validationResponse.organization_id, batalon_id = _validationResponse.batalon_id;
          _context2.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          offset = (page - 1) * limit;
          _context2.next = 8;
          return getcontractService(user_id, offset, limit, search, from, to, account_number_id, organization_id, batalon_id);
        case 8:
          _yield$getcontractSer = _context2.sent;
          data = _yield$getcontractSer.data;
          total = _yield$getcontractSer.total;
          from_balance = _yield$getcontractSer.from_balance;
          to_balance = _yield$getcontractSer.to_balance;
          _iterator2 = _createForOfIteratorHelper(data);
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              doc = _step2.value;
              doc.result_summa = Math.round(doc.result_summa * 100) / 100;
              doc.remaining_balance = Math.round(doc.remaining_balance * 100) / 100;
              doc.remaining_summa = Math.round(doc.remaining_summa * 100) / 100;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          pageCount = Math.ceil(total / limit);
          meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(Math.round(from_balance * 100) / 100),
            to_balance: returnStringSumma(Math.round(to_balance * 100) / 100)
          };
          return _context2.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, meta, data));
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          errorCatch(_context2.t0, res);
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 20]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.contractGetById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var user_id, account_number_id, id, result, _iterator3, _step3, task;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          _context3.next = 5;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 5:
          id = req.params.id;
          _context3.next = 8;
          return getByIdcontractService(user_id, id, true, account_number_id, null, req.i18n);
        case 8:
          result = _context3.sent;
          result.summa = Math.round(result.summa * 100) / 100;
          result.result_summa = Math.round(result.result_summa * 100) / 100;
          result.remaining_balance = Math.round(result.remaining_balance * 100) / 100;
          result.discount_money = Math.round(result.discount_money * 100) / 100;
          _iterator3 = _createForOfIteratorHelper(result.tasks);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              task = _step3.value;
              task.summa = Math.round(task.summa * 100) / 100;
              task.timemoney = Math.round(task.timemoney * 100) / 100;
              task.discount_money = Math.round(task.discount_money * 100) / 100;
              task.result_summa = Math.round(task.result_summa * 100) / 100;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          return _context3.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, null, result));
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          errorCatch(_context3.t0, res);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.contractUpdate = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, user_id, account_number_id, _req$body2, organ_account_number_id, gazna_number_id, oldData, check_doc, data, organization, check, _check2, _iterator4, _step4, _loop, _ret, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          _req$body2 = req.body, organ_account_number_id = _req$body2.organ_account_number_id, gazna_number_id = _req$body2.gazna_number_id;
          _context5.next = 7;
          return getByIdaccount_numberService(user_id, account_number_id, null, req.i18n);
        case 7:
          _context5.next = 9;
          return getByIdcontractService(user_id, id, false, account_number_id, null, req.i18n);
        case 9:
          oldData = _context5.sent;
          _context5.next = 12;
          return ContractService.checkDoc({
            id: id
          });
        case 12:
          check_doc = _context5.sent;
          if (!check_doc.length) {
            _context5.next = 15;
            break;
          }
          return _context5.abrupt("return", res.error(req.i18n.t("docExists"), 400, {
            docs: check_doc
          }));
        case 15:
          data = validationResponse(contractUpdateValidation, req.body);
          _context5.next = 18;
          return getByIdorganizationService(user_id, data.organization_id, null, req.i18n);
        case 18:
          organization = _context5.sent;
          if (!organ_account_number_id) {
            _context5.next = 23;
            break;
          }
          check = organization.account_numbers.find(function (item) {
            return item.id === organ_account_number_id;
          });
          if (check) {
            _context5.next = 23;
            break;
          }
          return _context5.abrupt("return", res.error(req.i18n.t("accountNumberNotFound"), 404));
        case 23:
          if (!gazna_number_id) {
            _context5.next = 27;
            break;
          }
          _check2 = organization.gazna_numbers.find(function (item) {
            return item.id === gazna_number_id;
          });
          if (_check2) {
            _context5.next = 27;
            break;
          }
          return _context5.abrupt("return", res.error(req.i18n.t("gaznaNumberNotFound"), 404));
        case 27:
          _iterator4 = _createForOfIteratorHelper(data.tasks);
          _context5.prev = 28;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var task, bxm, _check3;
            return _regeneratorRuntime().wrap(function _loop$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  task = _step4.value;
                  _context4.next = 3;
                  return getByIdBatalonService(user_id, task.batalon_id, null, null, req.i18n);
                case 3:
                  _context4.next = 5;
                  return getByIdBxmService(user_id, task.bxm_id, req.i18n);
                case 5:
                  bxm = _context4.sent;
                  task.bxm_summa = bxm.bxm_07;
                  if (!task.id) {
                    _context4.next = 11;
                    break;
                  }
                  _check3 = oldData.tasks.find(function (item) {
                    return item.id === task.id;
                  });
                  if (_check3) {
                    _context4.next = 11;
                    break;
                  }
                  return _context4.abrupt("return", {
                    v: res.error(req.i18n.t("taskNotFound"), 404)
                  });
                case 11:
                case "end":
                  return _context4.stop();
              }
            }, _loop);
          });
          _iterator4.s();
        case 31:
          if ((_step4 = _iterator4.n()).done) {
            _context5.next = 38;
            break;
          }
          return _context5.delegateYield(_loop(), "t0", 33);
        case 33:
          _ret = _context5.t0;
          if (!_ret) {
            _context5.next = 36;
            break;
          }
          return _context5.abrupt("return", _ret.v);
        case 36:
          _context5.next = 31;
          break;
        case 38:
          _context5.next = 43;
          break;
        case 40:
          _context5.prev = 40;
          _context5.t1 = _context5["catch"](28);
          _iterator4.e(_context5.t1);
        case 43:
          _context5.prev = 43;
          _iterator4.f();
          return _context5.finish(43);
        case 46:
          _context5.next = 48;
          return contractUpdateService(_objectSpread(_objectSpread({}, data), {}, {
            user_id: user_id,
            id: id,
            oldData: oldData
          }));
        case 48:
          result = _context5.sent;
          return _context5.abrupt("return", res.success(req.i18n.t("updateSuccess"), 200, null, result));
        case 52:
          _context5.prev = 52;
          _context5.t2 = _context5["catch"](0);
          errorCatch(_context5.t2, res);
        case 55:
        case "end":
          return _context5.stop();
      }
    }, _callee4, null, [[0, 52], [28, 40, 43, 46]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.contractDelete = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user_id, id, account_number_id, check_doc;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user_id = req.user.id;
          id = req.params.id;
          account_number_id = req.query.account_number_id;
          _context6.next = 6;
          return getByIdcontractService(user_id, id, false, account_number_id, null, req.i18n);
        case 6:
          _context6.next = 8;
          return ContractService.checkDoc({
            id: id
          });
        case 8:
          check_doc = _context6.sent;
          if (!check_doc.length) {
            _context6.next = 11;
            break;
          }
          return _context6.abrupt("return", res.error(req.i18n.t("docExists"), 400, {
            docs: check_doc
          }));
        case 11:
          _context6.next = 13;
          return deleteContractService(id);
        case 13:
          return _context6.abrupt("return", res.success(req.i18n.t("deleteSuccess"), 200));
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](0);
          errorCatch(_context6.t0, res);
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee5, null, [[0, 16]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.exportExcelData = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var user_id, _validationResponse2, from, to, account_number_id, _yield$dataForExcelSe, data, total, contractBook, contractSheet, headerRow, _iterator5, _step5, contract, totalRow, fileName, filePath;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user_id = req.user.id;
          _validationResponse2 = validationResponse(conrtactQueryValidation, req.query), from = _validationResponse2.from, to = _validationResponse2.to, account_number_id = _validationResponse2.account_number_id;
          _context7.next = 5;
          return dataForExcelService(user_id, account_number_id, from, to);
        case 5:
          _yield$dataForExcelSe = _context7.sent;
          data = _yield$dataForExcelSe.data;
          total = _yield$dataForExcelSe.total;
          contractBook = new ExcelJs.Workbook();
          contractSheet = contractBook.addWorksheet("Shartnomalar");
          contractSheet.columns = [{
            header: "N_",
            key: "doc_num",
            width: 10
          }, {
            header: "client",
            key: "organization_name",
            width: 40
          }, {
            header: "shartnoma sanasi",
            key: "doc_date",
            width: 20
          }, {
            header: "amal qilish muddati",
            key: "period",
            width: 20
          }, {
            header: "adress",
            key: "adress",
            width: 40
          }, {
            header: "Boshlanish vaqti",
            key: "start_date",
            width: 20
          }, {
            header: "Tugallash sanasi",
            key: "end_date",
            width: 20
          }, {
            header: "shegirma %",
            key: "discount",
            width: 20
          }, {
            header: "Chegirma summa",
            key: "discount_money",
            width: 20
          }, {
            header: "summa",
            key: "summa",
            width: 20
          }, {
            header: "umumiy summa",
            key: "result_summa",
            width: 20
          }, {
            header: "kridit",
            key: "kridit",
            width: 20
          }, {
            header: "debit",
            key: "debit",
            width: 20
          }, {
            header: "Qolgan summa",
            key: "remaining_summa",
            width: 20
          }, {
            header: "xisob raqam",
            key: "account_number",
            width: 25
          }, {
            header: "xodimlar soni",
            key: "all_worker_number",
            width: 20
          }, {
            header: "topshiriq vaqti",
            key: "all_task_time",
            width: 20
          }];
          headerRow = contractSheet.getRow(1);
          headerRow.font = {
            bold: true
          };
          headerRow.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
              argb: "FFFFFFFF"
            }
          };
          headerRow.alignment = {
            horizontal: "center"
          };
          headerRow.height = 30;
          contractSheet.columns.forEach(function (column) {
            column.alignment = {
              vertical: "middle",
              horizontal: "center",
              wrapText: true
            };
          });
          headerRow.eachCell(function (cell) {
            cell.border = {
              top: {
                style: "thin",
                color: {
                  argb: "FF000000"
                }
              },
              left: {
                style: "thin",
                color: {
                  argb: "FF000000"
                }
              },
              bottom: {
                style: "thin",
                color: {
                  argb: "FF000000"
                }
              },
              right: {
                style: "thin",
                color: {
                  argb: "FF000000"
                }
              }
            };
          });
          _iterator5 = _createForOfIteratorHelper(data);
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              contract = _step5.value;
              contractSheet.addRow({
                doc_num: contract.doc_num,
                organization_name: contract.organization_name,
                doc_date: contract.doc_date,
                period: contract.period,
                adress: contract.adress,
                start_date: "".concat(contract.start_date, " ").concat(contract.start_time),
                end_date: "".concat(contract.end_date, " ").concat(contract.end_time),
                discount: contract.discount,
                discount_money: contract.discount_money,
                summa: contract.summa,
                result_summa: contract.result_summa,
                kridit: contract.kridit,
                debit: contract.debit,
                remaining_summa: contract.remaining_summa,
                account_number: contract.account_number,
                all_worker_number: contract.all_worker_number,
                all_task_time: contract.all_task_time
              });
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          totalRow = contractSheet.addRow(["Barcha", "shartnomalar", "Soni", "".concat(total)]);
          totalRow.font = {
            bold: true
          };
          totalRow.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
              argb: "FFFFFFFF"
            }
          };
          totalRow.alignment = {
            horizontal: "center"
          };
          totalRow.eachCell(function (cell) {
            cell.border = {
              top: {
                style: "thin",
                color: {
                  argb: "FF000000"
                }
              },
              left: {
                style: "thin",
                color: {
                  argb: "FF000000"
                }
              },
              bottom: {
                style: "thin",
                color: {
                  argb: "FF000000"
                }
              },
              right: {
                style: "thin",
                color: {
                  argb: "FF000000"
                }
              }
            };
            cell.alignment = {
              vertical: "middle",
              horizontal: "center",
              wrapText: true
            };
          });
          fileName = "contracts.".concat(Date.now(), ".xlsx");
          filePath = path.join(__dirname, "../../public/exports", fileName);
          _context7.next = 29;
          return contractBook.xlsx.writeFile(filePath);
        case 29:
          return _context7.abrupt("return", res.download(filePath, function (err) {
            if (err) throw new ErrorResponse(err, err.statusCode);
          }));
        case 32:
          _context7.prev = 32;
          _context7.t0 = _context7["catch"](0);
          errorCatch(_context7.t0, res);
        case 35:
        case "end":
          return _context7.stop();
      }
    }, _callee6, null, [[0, 32]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.contractView = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var user_id, account_number_id, id, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          id = req.params.id;
          _context8.next = 6;
          return getByIdcontractService(user_id, id, false, account_number_id, null, req.i18n);
        case 6:
          _context8.next = 8;
          return contractViewService(user_id, account_number_id, id);
        case 8:
          result = _context8.sent;
          return _context8.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, null, result));
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](0);
          errorCatch(_context8.t0, res);
        case 15:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.conntractViewExcel = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var user_id, account_number_id, id, _yield$contractViewSe, contract, prixods, rasxod_fios, rasxods, workbook, fileName, worksheet, title, contract_date, organization, doer, address, organization_name, doer_name, inn, organization_str, doer_str, account_number, organization_account_number, doer_account_number, css_array, filePath;
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          user_id = req.user.id;
          account_number_id = req.query.account_number_id;
          id = req.params.id;
          _context9.next = 6;
          return contractViewService(user_id, account_number_id, id);
        case 6:
          _yield$contractViewSe = _context9.sent;
          contract = _yield$contractViewSe.contract;
          prixods = _yield$contractViewSe.prixods;
          rasxod_fios = _yield$contractViewSe.rasxod_fios;
          rasxods = _yield$contractViewSe.rasxods;
          workbook = new ExcelJs.Workbook();
          fileName = "contract_".concat(new Date().getTime(), ".xlsx");
          worksheet = workbook.addWorksheet("contract");
          worksheet.pageSetup.margins.left = 0;
          worksheet.pageSetup.margins.header = 0;
          worksheet.pageSetup.margins.footer = 0;
          worksheet.pageSetup.margins.right = 0;
          worksheet.mergeCells("A1", "K1");
          title = worksheet.getCell("A1");
          title.value = "".concat(contract.doc_num, "  \u0448\u0430\u0440\u0442\u043D\u043E\u043C\u0430 \u0442\u0430\u04B3\u043B\u0438\u043B\u0438");
          worksheet.mergeCells("A2", "C2");
          contract_date = worksheet.getCell("A2");
          contract_date.value = returnStringDate(new Date(contract.doc_date));
          worksheet.mergeCells("D2", "G2");
          organization = worksheet.getCell("D2");
          organization.value = "\u0411\u0443\u044E\u0440\u0442\u043C\u0430\u0447\u0438";
          worksheet.mergeCells("H2", "K2");
          doer = worksheet.getCell("H2");
          doer.value = "Бажарувчи";
          worksheet.mergeCells("A3", "C3");
          address = worksheet.getCell("A3");
          address.value = "Манзил";
          worksheet.mergeCells("D3", "G3");
          organization_name = worksheet.getCell("D3");
          organization_name.value = "".concat(contract.organization_name);
          worksheet.mergeCells("H3", "K3");
          doer_name = worksheet.getCell("H3");
          doer_name.value = "".concat(contract.doer);
          worksheet.mergeCells("A4", "C4");
          inn = worksheet.getCell("A4");
          inn.value = "ИНН";
          worksheet.mergeCells("D4", "G4");
          organization_str = worksheet.getCell("D4");
          organization_str.value = returnStringSumma(contract.organization_str);
          worksheet.mergeCells("H4", "K4");
          doer_str = worksheet.getCell("H4");
          doer_str.value = returnStringSumma(contract.str);
          worksheet.mergeCells("A5", "C5");
          account_number = worksheet.getCell("A5");
          account_number.value = "\u0425\u0438\u0441\u043E\u0431 \u0440\u0430\u049B\u0430\u043C\u0438";
          worksheet.mergeCells("D5", "G5");
          organization_account_number = worksheet.getCell("D5");
          organization_account_number.value = returnStringSumma(contract.organization_account_number);
          worksheet.mergeCells("H5", "K5");
          doer_account_number = worksheet.getCell("H5");
          doer_account_number.value = returnStringSumma(contract.account_number);
          css_array = [title, organization, doer, address, inn, account_number, contract_date, organization_name, organization_str, organization_account_number, doer_name, doer_str, doer_account_number];
          css_array.forEach(function (item, index) {
            var size = 10;
            var bold = true;
            var horizontal = "center";
            if (index === 0) size = 14;
            if (index > 6) bold = false;
            Object.assign(item, {
              numFmt: "#,## ",
              font: {
                size: size,
                bold: bold,
                color: {
                  argb: "FF000000"
                },
                name: "Times New Roman"
              },
              alignment: {
                vertical: "middle",
                horizontal: horizontal
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
          worksheet.getRow(1).height = 30;
          filePath = path.join(__dirname, "../../public/uploads/" + fileName);
          _context9.next = 63;
          return workbook.xlsx.writeFile(filePath);
        case 63:
          return _context9.abrupt("return", res.download(filePath, function (err) {
            if (err) throw new ErrorResponse(err, err.statusCode);
          }));
        case 66:
          _context9.prev = 66;
          _context9.t0 = _context9["catch"](0);
          errorCatch(_context9.t0, res);
        case 69:
        case "end":
          return _context9.stop();
      }
    }, _callee8, null, [[0, 66]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.importDataDB = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var oldDb, newDb, oldData, accountNumber, client, _iterator6, _step6, contract, organization, bxm, _iterator7, _step7, _loop2;
    return _regeneratorRuntime().wrap(function _callee9$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          oldDb = new pg.Pool({
            host: "localhost",
            port: 5433,
            password: "avazbek+1201",
            database: "milliy_gvardiya",
            user: "postgres"
          });
          newDb = new pg.Pool({
            host: "localhost",
            port: 5433,
            password: "avazbek+1201",
            database: "gvardiyaV2",
            user: "postgres"
          });
          _context11.prev = 2;
          _context11.next = 5;
          return oldDb.query("\n            SELECT \n                c.id, \n                c.contractnumber, \n                c.contractdate, \n                c.address, \n                c.clientname, \n                c.tasktime, \n                c.discount,\n                c.timemoney,\n                (\n                    SELECT ARRAY_AGG(ROW_TO_JSON(t))\n                    FROM (\n                        SELECT t.battalionname, t.workernumber, t.taskdate, t.tasktime \n                        FROM tasks t WHERE t.contract_id = c.id\n                    ) t\n                ) AS array1,\n                (\n                    SELECT ARRAY_AGG(ROW_TO_JSON(t))\n                    FROM (\n                        SELECT t.battalionname, t.workernumber, t.taskdate, t.tasktime \n                        FROM iib_tasks t WHERE t.contract_id = c.id\n                    ) t\n                ) AS array2  \n            FROM contracts c WHERE user_id = 1\n        ");
        case 5:
          oldData = _context11.sent;
          _context11.next = 8;
          return newDb.query("\n            SELECT id FROM account_number \n            WHERE isdeleted = false AND user_id = 1\n        ");
        case 8:
          accountNumber = _context11.sent;
          if (accountNumber.rows[0]) {
            _context11.next = 11;
            break;
          }
          throw new Error("Account number not found");
        case 11:
          _context11.next = 13;
          return newDb.connect();
        case 13:
          client = _context11.sent;
          _context11.prev = 14;
          _context11.next = 17;
          return client.query("BEGIN");
        case 17:
          _iterator6 = _createForOfIteratorHelper(oldData.rows);
          _context11.prev = 18;
          _iterator6.s();
        case 20:
          if ((_step6 = _iterator6.n()).done) {
            _context11.next = 30;
            break;
          }
          contract = _step6.value;
          _context11.next = 24;
          return client.query("SELECT id FROM organization WHERE name = $1", [contract.clientname.trim()]);
        case 24:
          organization = _context11.sent;
          if (organization.rows[0]) {
            _context11.next = 28;
            break;
          }
          _context11.next = 28;
          return client.query("INSERT INTO organization(name, user_id) VALUES($1, $2)", [contract.clientname.trim(), 1]);
        case 28:
          _context11.next = 20;
          break;
        case 30:
          _context11.next = 35;
          break;
        case 32:
          _context11.prev = 32;
          _context11.t0 = _context11["catch"](18);
          _iterator6.e(_context11.t0);
        case 35:
          _context11.prev = 35;
          _iterator6.f();
          return _context11.finish(35);
        case 38:
          _context11.next = 40;
          return client.query("SELECT * FROM bxm WHERE user_id = 1");
        case 40:
          bxm = _context11.sent;
          _iterator7 = _createForOfIteratorHelper(oldData.rows);
          _context11.prev = 42;
          _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
            var contract, organization, resultArray, allWorkerNumber, allTaskTime, summa, discountMoney, resultSumma, contractResult, _iterator8, _step8, task, taskSumma, taskDiscountMoney, taskResultSumma, batalon;
            return _regeneratorRuntime().wrap(function _loop2$(_context10) {
              while (1) switch (_context10.prev = _context10.next) {
                case 0:
                  contract = _step7.value;
                  _context10.next = 3;
                  return client.query("SELECT id FROM organization WHERE name = $1", [contract.clientname.trim()]);
                case 3:
                  organization = _context10.sent;
                  resultArray = [].concat(_toConsumableArray(contract.array1 || []), _toConsumableArray(contract.array2 || []));
                  allWorkerNumber = 0;
                  allTaskTime = 0;
                  summa = 0;
                  resultArray.forEach(function (task) {
                    allTaskTime += task.tasktime;
                    allWorkerNumber += task.workernumber;
                    summa += task.tasktime * task.workernumber * contract.timemoney;
                  });
                  discountMoney = contract.discount ? summa * (contract.discount / 100) : 0;
                  resultSumma = summa - discountMoney;
                  _context10.next = 13;
                  return client.query("\n                    INSERT INTO contract(\n                        doc_num, doc_date, adress, discount, summa, organization_id, \n                        account_number_id, user_id, all_worker_number, all_task_time, \n                        discount_money, result_summa\n                    ) \n                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) \n                    RETURNING id\n                ", [contract.contractnumber, contract.contractdate, contract.address, contract.discount || 0, summa, organization.rows[0].id, accountNumber.rows[0].id, 1, allWorkerNumber, allTaskTime, discountMoney, resultSumma]);
                case 13:
                  contractResult = _context10.sent;
                  _iterator8 = _createForOfIteratorHelper(resultArray);
                  _context10.prev = 15;
                  _iterator8.s();
                case 17:
                  if ((_step8 = _iterator8.n()).done) {
                    _context10.next = 31;
                    break;
                  }
                  task = _step8.value;
                  taskSumma = task.tasktime * task.workernumber * contract.timemoney;
                  taskDiscountMoney = taskSumma * (contract.discount / 100);
                  taskResultSumma = taskSumma - taskDiscountMoney;
                  _context10.next = 24;
                  return client.query("\n                        SELECT id FROM batalon WHERE name = $1 AND isdeleted = false\n                    ", [task.battalionname]);
                case 24:
                  batalon = _context10.sent;
                  if (batalon.rows[0]) {
                    _context10.next = 27;
                    break;
                  }
                  throw new Error("Batalon not found");
                case 27:
                  _context10.next = 29;
                  return client.query("\n                        INSERT INTO task(\n                            contract_id, batalon_id, task_time, worker_number, summa, \n                            user_id, task_date, discount_money, result_summa\n                        ) \n                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)\n                    ", [contractResult.rows[0].id, batalon.rows[0].id, task.tasktime, task.workernumber, taskSumma, 1, task.taskdate, taskDiscountMoney, taskResultSumma]);
                case 29:
                  _context10.next = 17;
                  break;
                case 31:
                  _context10.next = 36;
                  break;
                case 33:
                  _context10.prev = 33;
                  _context10.t0 = _context10["catch"](15);
                  _iterator8.e(_context10.t0);
                case 36:
                  _context10.prev = 36;
                  _iterator8.f();
                  return _context10.finish(36);
                case 39:
                case "end":
                  return _context10.stop();
              }
            }, _loop2, null, [[15, 33, 36, 39]]);
          });
          _iterator7.s();
        case 45:
          if ((_step7 = _iterator7.n()).done) {
            _context11.next = 49;
            break;
          }
          return _context11.delegateYield(_loop2(), "t1", 47);
        case 47:
          _context11.next = 45;
          break;
        case 49:
          _context11.next = 54;
          break;
        case 51:
          _context11.prev = 51;
          _context11.t2 = _context11["catch"](42);
          _iterator7.e(_context11.t2);
        case 54:
          _context11.prev = 54;
          _iterator7.f();
          return _context11.finish(54);
        case 57:
          _context11.next = 59;
          return client.query("COMMIT");
        case 59:
          res.send("Data imported successfully");
          _context11.next = 67;
          break;
        case 62:
          _context11.prev = 62;
          _context11.t3 = _context11["catch"](14);
          _context11.next = 66;
          return client.query("ROLLBACK");
        case 66:
          throw _context11.t3;
        case 67:
          _context11.prev = 67;
          client.release();
          return _context11.finish(67);
        case 70:
          _context11.next = 76;
          break;
        case 72:
          _context11.prev = 72;
          _context11.t4 = _context11["catch"](2);
          console.error(_context11.t4);
          res.status(500).json({
            message: "Error importing data",
            error: _context11.t4.message
          });
        case 76:
          _context11.prev = 76;
          _context11.next = 79;
          return oldDb.end();
        case 79:
          _context11.next = 81;
          return newDb.end();
        case 81:
          return _context11.finish(76);
        case 82:
        case "end":
          return _context11.stop();
      }
    }, _callee9, null, [[2, 72, 76, 82], [14, 62, 67, 70], [18, 32, 35, 38], [42, 51, 54, 57]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.importData = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var workbook, sheetName, sheet, result_summa, task_result_summa, data, batalons, _iterator9, _step9, doc, _iterator10, _step10, batalon, key, _task, organization, organ, client, docDate, validDate, contract, _iterator11, _step11, task;
    return _regeneratorRuntime().wrap(function _callee10$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          workbook = xlsx.readFile(req.file.path);
          sheetName = workbook.SheetNames[0];
          sheet = workbook.Sheets[sheetName];
          result_summa = 0;
          task_result_summa = 0;
          data = xlsx.utils.sheet_to_json(sheet);
          _context12.next = 8;
          return getBatalonService(1);
        case 8:
          batalons = _context12.sent;
          _iterator9 = _createForOfIteratorHelper(data);
          _context12.prev = 10;
          _iterator9.s();
        case 12:
          if ((_step9 = _iterator9.n()).done) {
            _context12.next = 75;
            break;
          }
          doc = _step9.value;
          doc.timeMoney = doc.summa / (doc.worker * doc.time);
          doc.client = doc.client.replace(/\(.*?\)/, "").trim();
          doc.client = doc.client.replace(/["\\]/g, "").trim();
          if (doc.doc_num <= 600) {
            result_summa += doc.summa;
          }
          doc.tasks = [];
          _iterator10 = _createForOfIteratorHelper(batalons);
          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              batalon = _step10.value;
              key = batalon.name;
              if (doc[key]) {
                _task = {
                  worker_number: doc[key],
                  batalon_id: batalon.id,
                  task_time: doc.time,
                  timeMoney: doc.timeMoney,
                  summa: doc.time * doc[key] * doc.timeMoney,
                  result_summa: doc.time * doc[key] * doc.timeMoney
                };
                if (!_task.result_summa) {
                  console.log(doc);
                }
                if (doc.doc_num <= 600) {
                  task_result_summa += _task.result_summa;
                }
                doc.tasks.push(_task);
              }
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
          _context12.next = 23;
          return pool.query("SELECT id FROM organization WHERE name ILIKE '%' || $1 || '%'", [doc.client]);
        case 23:
          organization = _context12.sent;
          if (organization.rows[0]) {
            _context12.next = 31;
            break;
          }
          _context12.next = 27;
          return pool.query("INSERT INTO organization(name) VALUES($1) RETURNING id", [doc.client]);
        case 27:
          organ = _context12.sent;
          doc.organ_id = organ.rows[0].id;
          _context12.next = 32;
          break;
        case 31:
          doc.organ_id = organization.rows[0].id;
        case 32:
          _context12.next = 34;
          return pool.connect();
        case 34:
          client = _context12.sent;
          _context12.next = 37;
          return client.query("BEGIN");
        case 37:
          docDate = doc.doc_date ? new Date(doc.doc_date) : new Date();
          validDate = docDate.getTime() && docDate.toString() !== "Invalid Date" ? docDate : new Date();
          _context12.prev = 39;
          _context12.next = 42;
          return pool.query("\n                INSERT INTO contract(\n                    doc_num, \n                    doc_date,\n                    summa, \n                    organization_id, \n                    account_number_id,\n                    user_id,\n                    all_worker_number,\n                    all_task_time,\n                    result_summa\n                ) \n                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id    \n            ", [doc.doc_num, validDate, doc.summa, doc.organ_id, 2, 1, doc.worker_number, doc.worker_number * doc.time, doc.summa]);
        case 42:
          contract = _context12.sent;
          _iterator11 = _createForOfIteratorHelper(doc.tasks);
          _context12.prev = 44;
          _iterator11.s();
        case 46:
          if ((_step11 = _iterator11.n()).done) {
            _context12.next = 52;
            break;
          }
          task = _step11.value;
          _context12.next = 50;
          return pool.query("\n                    INSERT INTO \n                    task(contract_id, batalon_id, task_time, worker_number, summa, user_id, result_summa, time_money) \n                    VALUES($1, $2, $3, $4, $5, $6, $7, $8)    \n                ", [contract.rows[0].id, task.batalon_id, task.task_time, task.worker_number, task.summa, 1, task.result_summa, task.timeMoney]);
        case 50:
          _context12.next = 46;
          break;
        case 52:
          _context12.next = 57;
          break;
        case 54:
          _context12.prev = 54;
          _context12.t0 = _context12["catch"](44);
          _iterator11.e(_context12.t0);
        case 57:
          _context12.prev = 57;
          _iterator11.f();
          return _context12.finish(57);
        case 60:
          _context12.next = 62;
          return client.query("COMMIT");
        case 62:
          _context12.next = 70;
          break;
        case 64:
          _context12.prev = 64;
          _context12.t1 = _context12["catch"](39);
          _context12.next = 68;
          return client.query("ROLLBACK");
        case 68:
          console.log(_context12.t1);
          return _context12.abrupt("return", res.send(_context12.t1.message));
        case 70:
          _context12.prev = 70;
          client.release();
          return _context12.finish(70);
        case 73:
          _context12.next = 12;
          break;
        case 75:
          _context12.next = 80;
          break;
        case 77:
          _context12.prev = 77;
          _context12.t2 = _context12["catch"](10);
          _iterator9.e(_context12.t2);
        case 80:
          _context12.prev = 80;
          _iterator9.f();
          return _context12.finish(80);
        case 83:
          return _context12.abrupt("return", res.success(req.i18n.t("getSuccess"), 200, {
            result_summa: result_summa,
            task_result_summa: task_result_summa
          }, data));
        case 84:
        case "end":
          return _context12.stop();
      }
    }, _callee10, null, [[10, 77, 80, 83], [39, 64, 70, 73], [44, 54, 57, 60]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();