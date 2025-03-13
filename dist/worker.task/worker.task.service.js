"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var pool = require('../config/db');
var ErrorResponse = require('../utils/errorResponse');
var _require = require('../helper/functions'),
  textCyrlToLatin = _require.textCyrlToLatin,
  textLatinToCyrl = _require.textLatinToCyrl;
var workerTaskCreateService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(task, workers) {
    var client, promises, one_time_summa, _iterator, _step, worker, summa, query, results;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return pool.connect();
        case 2:
          client = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return client.query('BEGIN');
        case 6:
          promises = [];
          one_time_summa = task.result_summa / task.worker_number / task.task_time;
          _iterator = _createForOfIteratorHelper(workers);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              worker = _step.value;
              summa = one_time_summa * worker.task_time;
              query = "INSERT INTO worker_task(worker_id, task_id, summa, task_time) VALUES($1, $2, $3, $4) RETURNING *";
              promises.push(client.query(query, [worker.worker_id, task.id, summa, worker.task_time]));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          _context.next = 12;
          return Promise.all(promises);
        case 12:
          results = _context.sent;
          _context.next = 15;
          return client.query('COMMIT');
        case 15:
          return _context.abrupt("return", results.map(function (result) {
            return result.rows[0];
          }));
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](3);
          _context.next = 22;
          return client.query('ROLLBACK');
        case 22:
          throw new ErrorResponse(_context.t0.message, _context.t0.statusCode);
        case 23:
          _context.prev = 23;
          client.release();
          return _context.finish(23);
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 18, 23, 26]]);
  }));
  return function workerTaskCreateService(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getByTaskIdWorkerTaskService = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(task_id, search) {
    var params, filter, translate, workers;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          params = [task_id];
          filter = "";
          if (search) {
            if (/^[a-zA-Z\s]+$/.test(search)) {
              translate = textLatinToCyrl(search);
            } else {
              translate = textCyrlToLatin(search);
            }
            filter = "AND (\n                        w.fio ILIKE  '%' || $".concat(params.length + 1, " || '%' \n                        OR w.fio ILIKE '%' || $").concat(params.length + 2, " || '%'\n                    )");
            params.push(search, translate);
          }
          _context2.next = 6;
          return pool.query("\n            SELECT \n                w_t.worker_id, \n                w.fio, \n                SUM(w_t.summa)::FLOAT AS summa, \n                SUM(w_t.task_time) AS task_time\n            FROM worker_task AS w_t\n            JOIN worker AS w ON w.id = w_t.worker_id \n            WHERE w_t.task_id = $1 \n                AND w_t.isdeleted = false\n                ".concat(filter, "\n            GROUP BY w.fio, w_t.worker_id\n        "), params);
        case 6:
          workers = _context2.sent;
          return _context2.abrupt("return", workers.rows);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          throw new ErrorResponse(_context2.t0, _context2.t0.statusCode);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getByTaskIdWorkerTaskService(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var workerTaskUpdateService = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id, worker_id, task_time, task, oldData) {
    var client, one_time_summa, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return pool.connect();
        case 2:
          client = _context3.sent;
          _context3.prev = 3;
          _context3.next = 6;
          return client.query("BEGIN");
        case 6:
          one_time_summa = task.summa / task.worker_number / task.task_time;
          _context3.next = 9;
          return client.query("UPDATE worker_task SET worker_id = $1, summa = $2, task_time = $3 WHERE id = $4 AND isdeleted = false RETURNING *", [worker_id, one_time_summa * task_time, task_time, id]);
        case 9:
          result = _context3.sent;
          _context3.next = 12;
          return client.query("UPDATE task SET remaining_task_time = $1 WHERE id = $2", [task.remaining_task_time + oldData.task_time - task_time, task.id]);
        case 12:
          _context3.next = 14;
          return client.query("COMMIT");
        case 14:
          return _context3.abrupt("return", result.rows[0]);
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](3);
          _context3.next = 21;
          return client.query('ROLLBACK');
        case 21:
          throw new ErrorResponse(_context3.t0.message, _context3.t0.statusCode);
        case 22:
          _context3.prev = 22;
          client.release();
          return _context3.finish(22);
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 17, 22, 25]]);
  }));
  return function workerTaskUpdateService(_x5, _x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteWorkerTaskService = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(worker_id, task_id) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return pool.query("UPDATE worker_task SET isdeleted = true WHERE worker_id = $1 AND isdeleted = false AND task_id = $2 RETURNING *", [worker_id, task_id]);
        case 3:
          _context4.next = 8;
          break;
        case 5:
          _context4.prev = 5;
          _context4.t0 = _context4["catch"](0);
          throw new ErrorResponse(_context4.t0.message, _context4.t0.statusCode);
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 5]]);
  }));
  return function deleteWorkerTaskService(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
var getByContractIdWorkerTaskService = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(contract_id) {
    var result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return pool.query("\n            SELECT \n                w_t.worker_id, \n                w.fio, \n                SUM(w_t.summa) AS summa, \n                SUM(w_t.task_time) AS task_time\n            FROM worker_task AS w_t\n            JOIN worker AS w ON w.id = w_t.worker_id \n            JOIN task AS t ON t.id = w_t.task_id\n            WHERE t.contract_id = $1 AND w_t.isdeleted = false\n            GROUP BY w.fio, w_t.worker_id\n        ", [contract_id]);
        case 3:
          result = _context5.sent;
          return _context5.abrupt("return", {
            worker_tasks: result.rows || []
          });
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          throw new ErrorResponse(_context5.t0, _context5.t0.statusCode);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function getByContractIdWorkerTaskService(_x12) {
    return _ref5.apply(this, arguments);
  };
}();
var getByTaskIdANDWorkerIdWorkerTaskService = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(task_id, worker_id, lang) {
    var worker;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return pool.query("\n            SELECT w.id, w.fio, w.batalon_id, SUM(w_t.summa)\n            FROM worker_task w_t\n            JOIN worker AS w ON w.id = w_t.worker_id \n            WHERE w_t.task_id = $1 AND w_t.isdeleted = false AND w_t.worker_id = $2\n            GROUP BY w.id, w.fio, w.batalon_id\n        ", [task_id, worker_id]);
        case 3:
          worker = _context6.sent;
          if (worker.rows[0]) {
            _context6.next = 6;
            break;
          }
          throw new ErrorResponse(lang.t('docNotFound'), 404);
        case 6:
          return _context6.abrupt("return", worker.rows[0]);
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          throw new ErrorResponse(_context6.t0, _context6.t0.statusCode);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function getByTaskIdANDWorkerIdWorkerTaskService(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteByTaskIDWorkerTaskService = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(task_id) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return pool.query("UPDATE worker_task SET isdeleted = true WHERE task_id = $1", [task_id]);
        case 3:
          _context7.next = 8;
          break;
        case 5:
          _context7.prev = 5;
          _context7.t0 = _context7["catch"](0);
          throw new ErrorResponse(_context7.t0, _context7.t0.statusCode);
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 5]]);
  }));
  return function deleteByTaskIDWorkerTaskService(_x16) {
    return _ref7.apply(this, arguments);
  };
}();
module.exports = {
  workerTaskCreateService: workerTaskCreateService,
  workerTaskUpdateService: workerTaskUpdateService,
  deleteWorkerTaskService: deleteWorkerTaskService,
  getByTaskIdWorkerTaskService: getByTaskIdWorkerTaskService,
  getByContractIdWorkerTaskService: getByContractIdWorkerTaskService,
  getByTaskIdANDWorkerIdWorkerTaskService: getByTaskIdANDWorkerIdWorkerTaskService,
  deleteByTaskIDWorkerTaskService: deleteByTaskIDWorkerTaskService
};