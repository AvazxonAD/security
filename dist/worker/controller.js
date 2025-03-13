"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('./service'),
  WorkerService = _require.WorkerService;
var _require2 = require('../batalon/service'),
  BatalonService = _require2.BatalonService;
var _require3 = require('./schema'),
  Schema = _require3.Schema;
var path = require('path');
exports.Controller = /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
  }
  return _createClass(_class, null, [{
    key: "workerCreate",
    value: function () {
      var _workerCreate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
        var user_id, _req$body, fio, batalon_id, account_number, xisob_raqam, batalon, check1, check2, check;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              user_id = req.user.id;
              _req$body = req.body, fio = _req$body.fio, batalon_id = _req$body.batalon_id, account_number = _req$body.account_number, xisob_raqam = _req$body.xisob_raqam;
              if (!batalon_id) {
                _context.next = 8;
                break;
              }
              _context.next = 5;
              return BatalonService.getById({
                user_id: user_id,
                id: batalon_id
              });
            case 5:
              batalon = _context.sent;
              if (batalon) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", res.error(req.i18n.t('batalonNotFound'), 404));
            case 8:
              if (!account_number) {
                _context.next = 14;
                break;
              }
              _context.next = 11;
              return WorkerService.workerGetByAccountNumber({
                user_id: user_id,
                account_number: account_number
              });
            case 11:
              check1 = _context.sent;
              if (!check1) {
                _context.next = 14;
                break;
              }
              return _context.abrupt("return", res.error(req.i18n.t('accountNumberAlreadyExists'), 409));
            case 14:
              if (!xisob_raqam) {
                _context.next = 20;
                break;
              }
              _context.next = 17;
              return WorkerService.workerGetByXisobRaqam({
                user_id: user_id,
                xisob_raqam: xisob_raqam
              });
            case 17:
              check2 = _context.sent;
              if (!check2) {
                _context.next = 20;
                break;
              }
              return _context.abrupt("return", res.error(req.i18n.t('xisobNumberAlreadyExists'), 409));
            case 20:
              _context.next = 22;
              return WorkerService.workerGetByFio({
                user_id: user_id,
                fio: fio
              });
            case 22:
              check = _context.sent;
              if (!check) {
                _context.next = 25;
                break;
              }
              return _context.abrupt("return", res.error(req.i18n.t('fioAlreadyExists'), 409));
            case 25:
              _context.next = 27;
              return WorkerService.workerCreate({
                fio: fio,
                batalon_id: batalon_id,
                account_number: account_number,
                xisob_raqam: xisob_raqam,
                user_id: user_id
              });
            case 27:
              return _context.abrupt("return", res.success(req.i18n.t('createSuccess'), 201));
            case 28:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function workerCreate(_x, _x2) {
        return _workerCreate.apply(this, arguments);
      }
      return workerCreate;
    }()
  }, {
    key: "workerGet",
    value: function () {
      var _workerGet = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var user_id, _req$query, page, limit, batalon_id, search, offset, _yield$WorkerService$, data, total, pageCount, meta;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              user_id = req.user.id;
              _req$query = req.query, page = _req$query.page, limit = _req$query.limit, batalon_id = _req$query.batalon_id, search = _req$query.search;
              offset = (page - 1) * limit;
              _context2.next = 5;
              return WorkerService.workerGet({
                user_id: user_id,
                search: search,
                batalon_id: batalon_id,
                offset: offset,
                limit: limit
              });
            case 5:
              _yield$WorkerService$ = _context2.sent;
              data = _yield$WorkerService$.data;
              total = _yield$WorkerService$.total;
              pageCount = Math.ceil(total / limit);
              meta = {
                pageCount: pageCount,
                count: total,
                currentPage: page,
                nextPage: page >= pageCount ? null : page + 1,
                backPage: page === 1 ? null : page - 1
              };
              return _context2.abrupt("return", res.success(req.i18n.t('getSuccess'), 200, meta, data));
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function workerGet(_x3, _x4) {
        return _workerGet.apply(this, arguments);
      }
      return workerGet;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var user_id, id, result;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              user_id = req.user.id;
              id = req.params.id;
              _context3.next = 4;
              return WorkerService.getById({
                user_id: user_id,
                id: id,
                isdeleted: true
              });
            case 4:
              result = _context3.sent;
              if (result) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", res.error(req.i18n.t('workerNotFound'), 404));
            case 7:
              return _context3.abrupt("return", res.success(req.i18n.t('getSuccess'), 200, null, result));
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getById(_x5, _x6) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
  }, {
    key: "workerUpdate",
    value: function () {
      var _workerUpdate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var user_id, id, _req$body2, fio, batalon_id, account_number, xisob_raqam, oldData, batalon, check1, check2, check;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              user_id = req.user.id;
              id = req.params.id;
              _req$body2 = req.body, fio = _req$body2.fio, batalon_id = _req$body2.batalon_id, account_number = _req$body2.account_number, xisob_raqam = _req$body2.xisob_raqam;
              _context4.next = 5;
              return WorkerService.getById({
                user_id: user_id,
                id: id
              });
            case 5:
              oldData = _context4.sent;
              if (oldData) {
                _context4.next = 8;
                break;
              }
              return _context4.abrupt("return", res.error(req.i18n.t('workerNotFound'), 404));
            case 8:
              if (!batalon_id) {
                _context4.next = 14;
                break;
              }
              _context4.next = 11;
              return BatalonService.getById({
                user_id: user_id,
                id: batalon_id
              });
            case 11:
              batalon = _context4.sent;
              if (batalon) {
                _context4.next = 14;
                break;
              }
              return _context4.abrupt("return", res.error(req.i18n.t('batalonNotFound'), 404));
            case 14:
              if (!account_number) {
                _context4.next = 21;
                break;
              }
              if (!(oldData.account_number !== account_number)) {
                _context4.next = 21;
                break;
              }
              _context4.next = 18;
              return WorkerService.workerGetByAccountNumber({
                user_id: user_id,
                account_number: account_number
              });
            case 18:
              check1 = _context4.sent;
              if (!check1) {
                _context4.next = 21;
                break;
              }
              return _context4.abrupt("return", res.error(req.i18n.t('accountNumberAlreadyExists'), 409));
            case 21:
              if (!xisob_raqam) {
                _context4.next = 28;
                break;
              }
              if (!(oldData.xisob_raqam !== xisob_raqam)) {
                _context4.next = 28;
                break;
              }
              _context4.next = 25;
              return WorkerService.workerGetByXisobRaqam({
                user_id: user_id,
                xisob_raqam: xisob_raqam
              });
            case 25:
              check2 = _context4.sent;
              if (!check2) {
                _context4.next = 28;
                break;
              }
              return _context4.abrupt("return", res.error(req.i18n.t('xisobNumberAlreadyExists'), 409));
            case 28:
              if (!(oldData.fio !== fio)) {
                _context4.next = 34;
                break;
              }
              _context4.next = 31;
              return WorkerService.workerGetByFio({
                user_id: user_id,
                fio: fio
              });
            case 31:
              check = _context4.sent;
              if (!check) {
                _context4.next = 34;
                break;
              }
              return _context4.abrupt("return", res.error(req.i18n.t('fioAlreadyExists'), 409));
            case 34:
              _context4.next = 36;
              return WorkerService.workerUpdate({
                fio: fio,
                batalon_id: batalon_id,
                account_number: account_number,
                xisob_raqam: xisob_raqam,
                id: id
              });
            case 36:
              return _context4.abrupt("return", res.success(req.i18n.t('updateSuccess'), 200));
            case 37:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function workerUpdate(_x7, _x8) {
        return _workerUpdate.apply(this, arguments);
      }
      return workerUpdate;
    }()
  }, {
    key: "workerDelete",
    value: function () {
      var _workerDelete = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var user_id, id, oldData;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              user_id = req.user.id;
              id = req.params.id;
              _context5.next = 4;
              return WorkerService.getById({
                user_id: user_id,
                id: id
              });
            case 4:
              oldData = _context5.sent;
              if (oldData) {
                _context5.next = 7;
                break;
              }
              return _context5.abrupt("return", res.error(req.i18n.t('workerNotFound'), 404));
            case 7:
              _context5.next = 9;
              return WorkerService.workerDelete({
                id: id
              });
            case 9:
              return _context5.abrupt("return", res.success(req.i18n.t('deleteSuccess'), 200));
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function workerDelete(_x9, _x10) {
        return _workerDelete.apply(this, arguments);
      }
      return workerDelete;
    }()
  }, {
    key: "exportExcel",
    value: function () {
      var _exportExcel = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var user_id, _req$query2, search, batalon_id, batalon, result, _yield$WorkerService$2, fileName, filePath;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              user_id = req.user.id;
              _req$query2 = req.query, search = _req$query2.search, batalon_id = _req$query2.batalon_id;
              if (!batalon_id) {
                _context6.next = 8;
                break;
              }
              _context6.next = 5;
              return BatalonService.getById({
                user_id: user_id,
                id: batalon_id
              });
            case 5:
              batalon = _context6.sent;
              if (batalon) {
                _context6.next = 8;
                break;
              }
              return _context6.abrupt("return", res.error(req.i18n.t('batalonNotFound'), 404));
            case 8:
              _context6.next = 10;
              return WorkerService.workerGet({
                user_id: user_id,
                search: search,
                batalon_id: batalon_id,
                offset: 0,
                limit: 100000
              });
            case 10:
              result = _context6.sent;
              _context6.next = 13;
              return WorkerService.exportExcel(result);
            case 13:
              _yield$WorkerService$2 = _context6.sent;
              fileName = _yield$WorkerService$2.fileName;
              filePath = _yield$WorkerService$2.filePath;
              res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              res.setHeader('Content-Disposition', "attachment; filename=\"".concat(fileName, "\""));
              return _context6.abrupt("return", res.sendFile(filePath));
            case 19:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function exportExcel(_x11, _x12) {
        return _exportExcel.apply(this, arguments);
      }
      return exportExcel;
    }()
  }, {
    key: "importData",
    value: function () {
      var _importData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var user_id, data, _iterator, _step, _batalon, worker, batalon, Batalon, Karta_raqam, FIO, Xisob_raqam;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              user_id = req.user.id;
              if (req.file) {
                _context7.next = 3;
                break;
              }
              return _context7.abrupt("return", res.error(req.i18n.t('fileError'), 404));
            case 3:
              _context7.next = 5;
              return WorkerService.readFile({
                filePath: req.file.path
              });
            case 5:
              data = _context7.sent;
              _iterator = _createForOfIteratorHelper(data);
              _context7.prev = 7;
              _iterator.s();
            case 9:
              if ((_step = _iterator.n()).done) {
                _context7.next = 25;
                break;
              }
              worker = _step.value;
              batalon = void 0;
              Batalon = worker.Batalon, Karta_raqam = worker.Karta_raqam, FIO = worker.FIO, Xisob_raqam = worker.Xisob_raqam;
              if (!Batalon) {
                _context7.next = 19;
                break;
              }
              _context7.next = 16;
              return BatalonService.getById({
                user_id: user_id,
                id: batalon_id
              });
            case 16:
              batalon = _context7.sent;
              if (batalon) {
                _context7.next = 19;
                break;
              }
              return _context7.abrupt("return", res.error(req.i18n.t('batalonNotFound'), 404));
            case 19:
              if (!(FIO.toLowerCase() === 'вакант' || !Karta_raqam && !Xisob_raqam)) {
                _context7.next = 21;
                break;
              }
              return _context7.abrupt("continue", 23);
            case 21:
              _context7.next = 23;
              return WorkerService.workerCreate({
                batalon_id: (_batalon = batalon) === null || _batalon === void 0 ? void 0 : _batalon.id,
                account_number: Karta_raqam,
                fio: FIO,
                xisob_raqam: Xisob_raqam,
                user_id: user_id
              });
            case 23:
              _context7.next = 9;
              break;
            case 25:
              _context7.next = 30;
              break;
            case 27:
              _context7.prev = 27;
              _context7.t0 = _context7["catch"](7);
              _iterator.e(_context7.t0);
            case 30:
              _context7.prev = 30;
              _iterator.f();
              return _context7.finish(30);
            case 33:
              return _context7.abrupt("return", res.success(req.i18n.t('importSuccess'), 201));
            case 34:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[7, 27, 30, 33]]);
      }));
      function importData(_x13, _x14) {
        return _importData.apply(this, arguments);
      }
      return importData;
    }()
  }, {
    key: "WorkerTemplate",
    value: function () {
      var _WorkerTemplate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
        var filePath;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              filePath = path.join(__dirname, '../../public/template/workers.template.xlsx');
              res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              res.setHeader('Content-Disposition', 'attachment; filename="workers.template.xlsx"');
              return _context8.abrupt("return", res.sendFile(filePath));
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function WorkerTemplate(_x15, _x16) {
        return _WorkerTemplate.apply(this, arguments);
      }
      return WorkerTemplate;
    }()
  }]);
}();