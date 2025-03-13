"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("./worker.task.service"),
  workerTaskCreateService = _require.workerTaskCreateService,
  deleteWorkerTaskService = _require.deleteWorkerTaskService,
  getByTaskIdWorkerTaskService = _require.getByTaskIdWorkerTaskService,
  getByContractIdWorkerTaskService = _require.getByContractIdWorkerTaskService,
  getByTaskIdANDWorkerIdWorkerTaskService = _require.getByTaskIdANDWorkerIdWorkerTaskService,
  deleteByTaskIDWorkerTaskService = _require.deleteByTaskIDWorkerTaskService;
var _require2 = require("../utils/validation"),
  workerTaskValidation = _require2.workerTaskValidation;
var _require3 = require("../utils/resFunc"),
  resFunc = _require3.resFunc;
var _require4 = require("../utils/response.validation"),
  validationResponse = _require4.validationResponse;
var _require5 = require('../utils/errorCatch'),
  errorCatch = _require5.errorCatch;
var _require6 = require('../task/task.service'),
  getByIdTaskService = _require6.getByIdTaskService;
var ErrorResponse = require("../utils/errorResponse");
var _require7 = require('../worker/service'),
  WorkerService = _require7.WorkerService;
var _require8 = require('../contract/db'),
  getByIdcontractService = _require8.getByIdcontractService;
var _require9 = require('./service'),
  WorkerTaskService = _require9.WorkerTaskService;
var workerTaskCreate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var user_id, task_id, _workerTaskValidation, value, error, task, all_task_time, _iterator, _step, worker, checkWorker, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user_id = req.user.id;
          task_id = req.query.task_id;
          _workerTaskValidation = workerTaskValidation.validate(req.body), value = _workerTaskValidation.value, error = _workerTaskValidation.error;
          if (!error) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.error(req.i18n.t('validationError'), 400));
        case 6:
          _context.next = 8;
          return getByIdTaskService(user_id, task_id, false, true, req.i18n);
        case 8:
          task = _context.sent;
          all_task_time = 0;
          _iterator = _createForOfIteratorHelper(value.workers);
          _context.prev = 11;
          _iterator.s();
        case 13:
          if ((_step = _iterator.n()).done) {
            _context.next = 23;
            break;
          }
          worker = _step.value;
          _context.next = 17;
          return WorkerService.getById({
            batalon_id: task.batalon_id,
            id: worker.worker_id,
            user_id: user_id
          });
        case 17:
          checkWorker = _context.sent;
          if (checkWorker) {
            _context.next = 20;
            break;
          }
          return _context.abrupt("return", res.error(req.i18n.t('workerNotFound'), 404));
        case 20:
          all_task_time += worker.task_time;
        case 21:
          _context.next = 13;
          break;
        case 23:
          _context.next = 28;
          break;
        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](11);
          _iterator.e(_context.t0);
        case 28:
          _context.prev = 28;
          _iterator.f();
          return _context.finish(28);
        case 31:
          console.log(task.remaining_task_time, all_task_time);
          if (!(all_task_time > task.remaining_task_time)) {
            _context.next = 34;
            break;
          }
          throw new ErrorResponse(req.i18n.t('taskTimeError'), 400);
        case 34:
          _context.next = 36;
          return deleteWorkerTaskService(task_id);
        case 36:
          _context.next = 38;
          return workerTaskCreateService(task, value.workers);
        case 38:
          result = _context.sent;
          return _context.abrupt("return", res.success(req.i18n.t('createSuccess'), 200, null, result));
        case 42:
          _context.prev = 42;
          _context.t1 = _context["catch"](0);
          errorCatch(_context.t1, res);
        case 45:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 42], [11, 25, 28, 31]]);
  }));
  return function workerTaskCreate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getBYTaskIdWorkerTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var user_id, task_id, search, workers;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user_id = req.user.id;
          task_id = req.query.task_id;
          search = req.query.search;
          _context2.next = 6;
          return getByIdTaskService(user_id, task_id, null, null, req.i18n);
        case 6:
          _context2.next = 8;
          return getByTaskIdWorkerTaskService(task_id, search);
        case 8:
          workers = _context2.sent;
          return _context2.abrupt("return", res.success(req.i18n.t('getSuccess'), 200, null, workers));
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          errorCatch(_context2.t0, res);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function getBYTaskIdWorkerTask(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var workerTaskUpdate = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var user_id, task_id, task, _validationResponse, workers, all_task_time, _iterator2, _step2, worker, checkWorker, check, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user_id = req.user.id;
          task_id = req.query.task_id;
          _context3.next = 5;
          return getByIdTaskService(user_id, task_id, null, null, req.i18n);
        case 5:
          task = _context3.sent;
          _validationResponse = validationResponse(workerTaskValidation, req.body), workers = _validationResponse.workers;
          all_task_time = 0;
          _iterator2 = _createForOfIteratorHelper(workers);
          _context3.prev = 9;
          _iterator2.s();
        case 11:
          if ((_step2 = _iterator2.n()).done) {
            _context3.next = 21;
            break;
          }
          worker = _step2.value;
          _context3.next = 15;
          return WorkerService.getById({
            batalon_id: task.batalon_id,
            id: worker.worker_id,
            user_id: user_id
          });
        case 15:
          checkWorker = _context3.sent;
          if (checkWorker) {
            _context3.next = 18;
            break;
          }
          return _context3.abrupt("return", res.error(req.i18n.t('workerNotFound'), 404));
        case 18:
          all_task_time += worker.task_time;
        case 19:
          _context3.next = 11;
          break;
        case 21:
          _context3.next = 26;
          break;
        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](9);
          _iterator2.e(_context3.t0);
        case 26:
          _context3.prev = 26;
          _iterator2.f();
          return _context3.finish(26);
        case 29:
          if (!(all_task_time > task.real_task_time)) {
            _context3.next = 31;
            break;
          }
          throw new ErrorResponse(req.i18n.t('taskTimeError'), 400);
        case 31:
          _context3.next = 33;
          return WorkerTaskService.checkDoc({
            task_id: task_id
          });
        case 33:
          check = _context3.sent;
          if (!check.length) {
            _context3.next = 36;
            break;
          }
          return _context3.abrupt("return", res.error(req.i18n.t('docExists'), 400, {
            docs: check
          }));
        case 36:
          _context3.next = 38;
          return deleteByTaskIDWorkerTaskService(task_id);
        case 38:
          _context3.next = 40;
          return workerTaskCreateService(task, workers, all_task_time);
        case 40:
          result = _context3.sent;
          return _context3.abrupt("return", res.success(req.i18n.t('updateSuccess'), 200, null, result));
        case 44:
          _context3.prev = 44;
          _context3.t1 = _context3["catch"](0);
          errorCatch(_context3.t1, res);
        case 47:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 44], [9, 23, 26, 29]]);
  }));
  return function workerTaskUpdate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var workerTaskDelete = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var user_id, worker_id, task_id, task, checkWorker, check;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          user_id = req.user.id;
          worker_id = req.query.worker_id;
          task_id = req.query.task_id;
          _context4.next = 6;
          return getByIdTaskService(user_id, task_id, null, null, req.i18n);
        case 6:
          task = _context4.sent;
          _context4.next = 9;
          return WorkerService.getById({
            batalon_id: task.batalon_id,
            id: worker_id,
            user_id: user_id
          });
        case 9:
          checkWorker = _context4.sent;
          if (checkWorker) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.error(req.i18n.t('workerNotFound'), 404));
        case 12:
          _context4.next = 14;
          return getByTaskIdANDWorkerIdWorkerTaskService(task_id, worker_id, req.i18n);
        case 14:
          _context4.next = 16;
          return WorkerTaskService.checkDoc({
            task_id: task_id
          });
        case 16:
          check = _context4.sent;
          if (!check.length) {
            _context4.next = 19;
            break;
          }
          return _context4.abrupt("return", res.error(req.i18n.t('docExists'), 400, {
            docs: check
          }));
        case 19:
          _context4.next = 21;
          return deleteWorkerTaskService(worker_id, task_id);
        case 21:
          return _context4.abrupt("return", res.success(req.i18n.t('deleteSuccess'), 200));
        case 24:
          _context4.prev = 24;
          _context4.t0 = _context4["catch"](0);
          errorCatch(_context4.t0, res);
        case 27:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 24]]);
  }));
  return function workerTaskDelete(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getByContractIdWorkerTask = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user_id, contract_id, account_number_id, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          user_id = req.user.id;
          contract_id = req.params.id;
          account_number_id = req.query.account_number_id;
          _context5.next = 6;
          return getByIdcontractService(user_id, contract_id, false, account_number_id, null, req.i18n);
        case 6:
          _context5.next = 8;
          return getByContractIdWorkerTaskService(contract_id);
        case 8:
          result = _context5.sent;
          return _context5.abrupt("return", res.success(req.i18n.t('getSuccess'), 200, null, result));
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          errorCatch(_context5.t0, res);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function getByContractIdWorkerTask(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  workerTaskCreate: workerTaskCreate,
  workerTaskUpdate: workerTaskUpdate,
  workerTaskDelete: workerTaskDelete,
  getBYTaskIdWorkerTask: getBYTaskIdWorkerTask,
  getByContractIdWorkerTask: getByContractIdWorkerTask
};