"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _this = void 0;
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
var _require = require("@db/index"),
  db = _require.db;
exports.ContractDB = /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
  }
  return _createClass(_class, null, [{
    key: "checkDoc",
    value: function () {
      var _checkDoc = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
        var query, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              query = "\n            SELECT \n                id,\n                doc_num,\n                doc_date,\n                'prixod' AS type\n            FROM prixod\n            WHERE contract_id = $1\n                AND isdeleted = false\n            \n            UNION ALL\n            \n            SELECT \n                d.id,\n                d.doc_num,\n                d.doc_date,\n                'prixod' AS type \n            FROM rasxod_fio_doc d\n            JOIN rasxod_fio ch ON ch.rasxod_fio_doc_id = d.id\n            JOIN worker_task AS w_t ON w_t.id = ch.worker_task_id \n            JOIN task AS t ON t.id = w_t.task_id\n            WHERE t.contract_id = $1 \n                AND d.isdeleted = false \n            \n            UNION ALL \n        \n            SELECT \n                d.id,\n                d.doc_num,\n                d.doc_date,\n                'prixod' AS type\n            FROM rasxod_doc d\n            JOIN rasxod ch ON ch.rasxod_doc_id = d.id\n            JOIN task AS t ON t.id = ch.task_id\n            WHERE t.contract_id = $1 \n                AND d.isdeleted = false\n        ";
              _context.next = 3;
              return db.query(query, params);
            case 3:
              result = _context.sent;
              return _context.abrupt("return", result);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function checkDoc(_x) {
        return _checkDoc.apply(this, arguments);
      }
      return checkDoc;
    }()
  }, {
    key: "deleteTask",
    value: function () {
      var _deleteTask = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params, client) {
        var query;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              query = "UPDATE task SET isdeleted = true WHERE id = $1";
              _context2.next = 3;
              return client.query(query, params);
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function deleteTask(_x2, _x3) {
        return _deleteTask.apply(this, arguments);
      }
      return deleteTask;
    }()
  }, {
    key: "updateTask",
    value: function () {
      var _updateTask = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params, client) {
        var query;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              query = "\n            UPDATE task \n            SET \n                batalon_id = $1, \n                task_time = $2, \n                worker_number = $3, \n                summa = $4, \n                task_date = $5, \n                discount_money = $6, \n                result_summa = $7, \n                bxm_id = $8, \n                time_money = $9, \n                address = $10,\n                comment = $11\n            WHERE id = $12\n        ";
              _context3.next = 3;
              return client.query(query, params);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function updateTask(_x4, _x5) {
        return _updateTask.apply(this, arguments);
      }
      return updateTask;
    }()
  }]);
}();
var pool = require("../config/db");
var ErrorResponse = require("../utils/errorResponse");
exports.contractCreateService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
    var client, all_worker_number, all_task_time, discount_money, summa, result_summa, _yield$client$query, rows, contract, taskPromises, tasksResults;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return pool.connect();
        case 2:
          client = _context4.sent;
          _context4.prev = 3;
          all_worker_number = 0;
          all_task_time = 0;
          discount_money = 0;
          summa = 0;
          result_summa = 0;
          _context4.next = 11;
          return client.query("BEGIN");
        case 11:
          data.tasks.forEach(function (element) {
            all_task_time += element.task_time;
            all_worker_number += element.worker_number;
            summa += element.task_time * element.worker_number * element.bxm_summa;
          });
          if (data.discount) {
            discount_money = summa * (data.discount / 100);
            result_summa = summa - discount_money;
          } else {
            result_summa = summa;
          }
          console.log(data.organ_account_number_id);
          _context4.next = 16;
          return client.query("\n            INSERT INTO contract(\n                doc_num, \n                doc_date, \n                period, \n                adress, \n                start_date, \n                end_date, \n                discount, \n                summa, \n                organization_id, \n                account_number_id,\n                user_id,\n                start_time,\n                end_time,\n                all_worker_number,\n                all_task_time,\n                discount_money,\n                result_summa,\n                dist,\n                date,\n                organ_account_number_id,\n                gazna_number_id\n            ) \n            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *\n        ", [data.doc_num, data.doc_date, data.period, data.adress, data.start_date, data.end_date, data.discount, summa, data.organization_id, data.account_number_id, data.user_id, data.start_time, data.end_time, all_worker_number, all_task_time, discount_money, result_summa, data.dist, data.date, data.organ_account_number_id, data.gazna_number_id]);
        case 16:
          _yield$client$query = _context4.sent;
          rows = _yield$client$query.rows;
          contract = rows[0];
          taskPromises = data.tasks.map(function (task) {
            var task_discount_money = 0;
            var task_result_summa = 0;
            var task_summa = task.task_time * task.worker_number * task.bxm_summa;
            if (data.discount) {
              task_discount_money = task_summa * (data.discount / 100);
              task_result_summa = task_summa - task_discount_money;
            } else {
              task_result_summa = task_summa;
            }
            return client.query("\n                INSERT INTO \n                task(contract_id, batalon_id, task_time, worker_number, summa, user_id, task_date, discount_money, result_summa, bxm_id, time_money, address, comment) \n                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *\n            ", [contract.id, task.batalon_id, task.task_time, task.worker_number, task_summa, data.user_id, task.task_date ? task.task_date : null, task_discount_money, task_result_summa, task.bxm_id, task.bxm_summa, task.address, task.comment]);
          });
          _context4.next = 22;
          return Promise.all(taskPromises);
        case 22:
          tasksResults = _context4.sent;
          contract.tasks = tasksResults.map(function (result) {
            return result.rows[0];
          });
          _context4.next = 26;
          return client.query("COMMIT");
        case 26:
          return _context4.abrupt("return", contract);
        case 29:
          _context4.prev = 29;
          _context4.t0 = _context4["catch"](3);
          _context4.next = 33;
          return client.query("ROLLBACK");
        case 33:
          throw new ErrorResponse(_context4.t0.message || "Error creating contract", _context4.t0.statusCode || 500);
        case 34:
          _context4.prev = 34;
          client.release();
          return _context4.finish(34);
        case 37:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 29, 34, 37]]);
  }));
  return function (_x6) {
    return _ref.apply(this, arguments);
  };
}();
exports.contractUpdateService = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data) {
    var client, all_worker_number, all_task_time, discount_money, summa, result_summa, _yield$client$query2, rows, contract, create_tasks, _iterator, _step, _loop, _iterator2, _step2, task, taskPromises;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return pool.connect();
        case 2:
          client = _context6.sent;
          _context6.prev = 3;
          all_worker_number = 0;
          all_task_time = 0;
          discount_money = 0;
          summa = 0;
          result_summa = 0;
          _context6.next = 11;
          return client.query("BEGIN");
        case 11:
          data.tasks.forEach(function (element) {
            all_task_time += element.task_time;
            all_worker_number += element.worker_number;
            summa += element.task_time * element.worker_number * element.bxm_summa;
          });
          if (data.discount) {
            discount_money = summa * (data.discount / 100);
            result_summa = summa - discount_money;
          } else {
            result_summa = summa;
          }
          _context6.next = 15;
          return client.query("\n            UPDATE contract SET \n                doc_num = $1, \n                doc_date = $2, \n                period = $3, \n                adress = $4, \n                start_date = $5, \n                end_date = $6, \n                discount = $7, \n                summa = $8, \n                organization_id = $9, \n                start_time = $10,\n                end_time = $11,\n                all_worker_number = $12,\n                all_task_time = $13,\n                discount_money = $14,\n                result_summa = $15,\n                dist = $16,\n                date = $17,\n                organ_account_number_id = $18,\n                gazna_number_id = $19\n            WHERE id = $20 AND isdeleted = false RETURNING *\n        ", [data.doc_num, data.doc_date, data.period, data.adress, data.start_date, data.end_date, data.discount, summa, data.organization_id, data.start_time, data.end_time, all_worker_number, all_task_time, discount_money, result_summa, data.dist, data.date, data.organ_account_number_id, data.gazna_number_id, data.id]);
        case 15:
          _yield$client$query2 = _context6.sent;
          rows = _yield$client$query2.rows;
          contract = rows[0];
          create_tasks = [];
          _iterator = _createForOfIteratorHelper(data.oldData.tasks);
          _context6.prev = 20;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var task, check;
            return _regeneratorRuntime().wrap(function _loop$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  task = _step.value;
                  check = data.tasks.find(function (item) {
                    return item.id === task.id;
                  });
                  if (check) {
                    _context5.next = 5;
                    break;
                  }
                  _context5.next = 5;
                  return _this.ContractDB.deleteTask([task.id], client);
                case 5:
                case "end":
                  return _context5.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 23:
          if ((_step = _iterator.n()).done) {
            _context6.next = 27;
            break;
          }
          return _context6.delegateYield(_loop(), "t0", 25);
        case 25:
          _context6.next = 23;
          break;
        case 27:
          _context6.next = 32;
          break;
        case 29:
          _context6.prev = 29;
          _context6.t1 = _context6["catch"](20);
          _iterator.e(_context6.t1);
        case 32:
          _context6.prev = 32;
          _iterator.f();
          return _context6.finish(32);
        case 35:
          _iterator2 = _createForOfIteratorHelper(data.tasks);
          _context6.prev = 36;
          _iterator2.s();
        case 38:
          if ((_step2 = _iterator2.n()).done) {
            _context6.next = 52;
            break;
          }
          task = _step2.value;
          task.task_discount_money = 0;
          task.task_result_summa = 0;
          task.task_summa = task.task_time * task.worker_number * task.bxm_summa;
          if (data.discount) {
            task.task_discount_money = task.task_summa * (data.discount / 100);
            task.task_result_summa = task.task_summa - task.task_discount_money;
          } else {
            task.task_result_summa = task.task_summa;
          }
          if (!task.id) {
            _context6.next = 49;
            break;
          }
          _context6.next = 47;
          return _this.ContractDB.updateTask([task.batalon_id, task.task_time, task.worker_number, task.task_summa, task.task_date ? task.task_date : null, task.task_discount_money, task.task_result_summa, task.bxm_id, task.bxm_summa, task.address, task.comment, task.id], client);
        case 47:
          _context6.next = 50;
          break;
        case 49:
          create_tasks.push(task);
        case 50:
          _context6.next = 38;
          break;
        case 52:
          _context6.next = 57;
          break;
        case 54:
          _context6.prev = 54;
          _context6.t2 = _context6["catch"](36);
          _iterator2.e(_context6.t2);
        case 57:
          _context6.prev = 57;
          _iterator2.f();
          return _context6.finish(57);
        case 60:
          taskPromises = create_tasks.map(function (task) {
            return client.query("\n                INSERT INTO \n                task(\n                    contract_id, \n                    batalon_id, \n                    task_time, \n                    worker_number, \n                    summa, \n                    user_id, \n                    task_date, \n                    discount_money, \n                    result_summa, \n                    bxm_id, \n                    time_money, \n                    address,\n                    comment\n                ) \n                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)\n            ", [contract.id, task.batalon_id, task.task_time, task.worker_number, task.task_summa, data.user_id, task.task_date ? task.task_date : null, task.task_discount_money, task.task_result_summa, task.bxm_id, task.bxm_summa, task.address, task.comment]);
          });
          _context6.next = 63;
          return Promise.all(taskPromises);
        case 63:
          _context6.next = 65;
          return client.query("COMMIT");
        case 65:
          return _context6.abrupt("return", contract);
        case 68:
          _context6.prev = 68;
          _context6.t3 = _context6["catch"](3);
          _context6.next = 72;
          return client.query("ROLLBACK");
        case 72:
          throw new ErrorResponse(_context6.t3.message || "Error updating contract", _context6.t3.statusCode || 500);
        case 73:
          _context6.prev = 73;
          client.release();
          return _context6.finish(73);
        case 76:
        case "end":
          return _context6.stop();
      }
    }, _callee5, null, [[3, 68, 73, 76], [20, 29, 32, 35], [36, 54, 57, 60]]);
  }));
  return function (_x7) {
    return _ref2.apply(this, arguments);
  };
}();
exports.checkRaxodContract = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(contract_id) {
    var query, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          query = "--sql\n        SELECT t.contract_id, d.rasxod_fio_doc_id AS d \n        FROM rasxod_fio d\n        JOIN worker_task AS w_t ON w_t.id = d.worker_task_id \n        JOIN task AS t ON t.id = w_t.task_id\n        WHERE t.contract_id = $1 AND d.isdeleted = false \n        UNION ALL \n        SELECT t.contract_id,  d.rasxod_doc_id AS d \n        FROM rasxod d\n        JOIN task AS t ON t.id = d.task_id\n        WHERE t.contract_id = $1 AND d.isdeleted = false\n    ";
          _context7.next = 3;
          return pool.query(query, [contract_id]);
        case 3:
          result = _context7.sent;
          return _context7.abrupt("return", result.rows[0]);
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee6);
  }));
  return function (_x8) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getcontractService = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(user_id, offset, limit, search, from, to, account_number_id) {
    var organization_id,
      batalion_id,
      _rows$,
      organization_filter,
      serach_filter,
      batalion_filter,
      params,
      tasks_search_filter,
      tasks_filter,
      query,
      _yield$pool$query,
      rows,
      _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          organization_id = _args8.length > 7 && _args8[7] !== undefined ? _args8[7] : null;
          batalion_id = _args8.length > 8 && _args8[8] !== undefined ? _args8[8] : null;
          _context8.prev = 2;
          organization_filter = "";
          serach_filter = "";
          batalion_filter = "";
          params = [user_id, offset, limit, from, to, account_number_id];
          tasks_search_filter = "";
          tasks_filter = "";
          if (search) {
            serach_filter = "AND (\n                    d.doc_num = $".concat(params.length + 1, " \n                    OR o.name ILIKE  '%' || $").concat(params.length + 1, " || '%'\n                    OR EXISTS (\n                        SELECT 1 \n                        FROM task t \n                        JOIN batalon b ON t.batalon_id = b.id \n                        WHERE t.isdeleted = false \n                            AND b.name = $").concat(params.length + 1, " \n                            AND d.id = t.contract_id \n                    )\n                )\n            ");
            tasks_search_filter = "AND b.name = $".concat(params.length + 1);
            params.push(search);
          }
          if (organization_id) {
            organization_filter = "AND d.organization_id = $".concat(params.length + 1);
            params.push(organization_id);
          }
          if (batalion_id) {
            tasks_filter = "AND t.batalon_id = $".concat(params.length + 1);
            batalion_filter = "AND EXISTS (SELECT * FROM task AS t WHERE t.isdeleted = false AND t.batalon_id = $".concat(params.length + 1, " AND d.id = t.contract_id )");
            params.push(batalion_id);
          }
          query = "\n            WITH data AS (\n                SELECT \n                    d.id,\n                    d.doc_num, \n                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date, \n                    d.result_summa,\n                    d.adress, \n                    d.dist,\n                    o.id AS organization_id,\n                    o.name AS organization_name,\n                    o.address AS organization_address,\n                    o.str AS organization_str,\n                    o.bank_name AS organization_bank_name,\n                    o.mfo AS organization_mfo,\n                    g.gazna_number,\n                    d.gazna_number_id::INTEGER ,\n                    a.account_number,\n                    d.organ_account_number_id::INTEGER,\n                    ( \n                        SELECT \n                            (d.result_summa - COALESCE(SUM(summa), 0))::FLOAT \n                            FROM prixod \n                            WHERE isdeleted = false \n                                AND contract_id = d.id\n                    ) AS remaining_balance,\n                    (\n                        SELECT \n                            COALESCE(SUM(summa), 0) \n                        FROM prixod \n                        WHERE isdeleted = false \n                            AND contract_id = d.id \n                    )::FLOAT AS remaining_summa,\n                    (\n                        SELECT \n                            JSON_AGG(row_to_json(t))\n                        FROM task t \n                        JOIN batalon b ON t.batalon_id = b.id \n                        WHERE t.isdeleted = false \n                            AND d.id = t.contract_id \n                            ".concat(tasks_search_filter, "\n                            ").concat(tasks_filter, "\n                    ) AS tasks\n                FROM contract  AS d \n                JOIN organization AS o ON o.id = d.organization_id\n                LEFT JOIN gazna_numbers g ON g.id = d.gazna_number_id\n                LEFT JOIN organ_account_numbers a ON a.id = d.organ_account_number_id\n                WHERE d.isdeleted = false \n                    AND d.user_id = $1 \n                    ").concat(serach_filter, " \n                    ").concat(organization_filter, " \n                    ").concat(batalion_filter, "\n                    AND d.doc_date BETWEEN $4 AND $5 \n                    AND d.account_number_id = $6\n                ORDER BY CAST(d.doc_num AS FLOAT)\n                OFFSET $2 LIMIT $3\n            )\n            SELECT \n                ARRAY_AGG(row_to_json(data)) AS data,\n                (\n                    SELECT COALESCE(COUNT(d.id), 0) \n                    FROM contract AS d \n                    JOIN organization AS o ON o.id = d.organization_id \n                    WHERE d.isdeleted = false \n                        AND d.user_id = $1 \n                        AND d.doc_date BETWEEN $4 AND $5 \n                        AND d.account_number_id = $6 \n                        ").concat(serach_filter, " \n                        ").concat(organization_filter, " \n                        ").concat(batalion_filter, "\n                )::INTEGER AS total_count,\n                (\n                    SELECT COALESCE(SUM(d.result_summa), 0) \n                    FROM contract AS d \n                    JOIN organization AS o ON o.id = d.organization_id \n                    WHERE d.isdeleted = false \n                        AND d.user_id = $1 \n                        AND d.doc_date <= $4 \n                        AND d.account_number_id = $6 \n                        ").concat(serach_filter, " \n                        ").concat(organization_filter, " \n                        ").concat(batalion_filter, "\n                )::FLOAT AS from_balance,\n                (\n                    SELECT COALESCE(SUM(d.result_summa), 0) \n                    FROM contract AS d \n                    LEFT JOIN organization AS o ON o.id = d.organization_id \n                    WHERE d.isdeleted = false \n                        AND d.user_id = $1 \n                        AND d.doc_date <= $5 \n                        AND d.account_number_id = $6 \n                        ").concat(serach_filter, " \n                        ").concat(organization_filter, " \n                        ").concat(batalion_filter, "\n                )::FLOAT AS to_balance\n            FROM data\n        ");
          _context8.next = 15;
          return pool.query(query, params);
        case 15:
          _yield$pool$query = _context8.sent;
          rows = _yield$pool$query.rows;
          return _context8.abrupt("return", {
            data: ((_rows$ = rows[0]) === null || _rows$ === void 0 ? void 0 : _rows$.data) || [],
            total: rows[0].total_count,
            from_balance: rows[0].from_balance,
            to_balance: rows[0].to_balance
          });
        case 20:
          _context8.prev = 20;
          _context8.t0 = _context8["catch"](2);
          throw new ErrorResponse(_context8.t0, _context8.t0.statusCode);
        case 23:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[2, 20]]);
  }));
  return function (_x9, _x10, _x11, _x12, _x13, _x14, _x15) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getByIdcontractService = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(user_id, id) {
    var isdeleted,
      account_number_id,
      organization_id,
      lang,
      params,
      organization,
      filter,
      filter_task,
      query,
      result,
      _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          isdeleted = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : false;
          account_number_id = _args9.length > 3 ? _args9[3] : undefined;
          organization_id = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : null;
          lang = _args9.length > 5 ? _args9[5] : undefined;
          _context9.prev = 4;
          params = [user_id, id, account_number_id];
          organization = "";
          filter = "";
          filter_task = "";
          if (!isdeleted) {
            filter = "AND d.isdeleted = false";
            filter_task = " AND t.isdeleted = false";
          }
          if (organization_id) {
            organization = " AND d.organization_id = $".concat(params.length + 1);
            params.push(organization_id);
          }
          query = "\n            SELECT \n                d.id,\n                d.doc_num, \n                TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date, \n                TO_CHAR(d.period, 'YYYY-MM-DD') AS period, \n                d.adress, \n                TO_CHAR(d.start_date, 'YYYY-MM-DD') AS start_date, \n                TO_CHAR(d.end_date, 'YYYY-MM-DD') AS end_date, \n                d.discount, \n                d.discount_money::FLOAT, \n                d.summa::FLOAT, \n                d.result_summa::FLOAT, \n                d.organization_id, \n                d.account_number_id::INTEGER,\n                d.organ_account_number_id::INTEGER,\n                d.gazna_number_id::INTEGER,\n                d.start_time,\n                d.end_time,\n                d.all_worker_number,\n                d.all_task_time,\n                d.dist,\n                d.date,\n                o.id AS organization_id,\n                o.name AS organization_name,\n                o.address AS organization_address,\n                o.str AS organization_str,\n                o.bank_name AS organization_bank_name,\n                o.mfo AS organization_mfo,\n                g.gazna_number,\n                a.account_number,\n                ( SELECT (d.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = d.id) AS remaining_balance,\n                (\n                    SELECT COALESCE(JSON_AGG(row_to_json(subtasks)), '[]'::JSON)\n                    FROM (\n                        SELECT \n                            t.id,\n                            t.batalon_id, \n                            t.task_time, \n                            t.worker_number,\n                            t.summa, \n                            COALESCE(t.time_money, 0) AS timemoney, \n                            t.discount_money,\n                            t.result_summa,\n                            TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date,\n                            b.name AS batalon_name,\n                            t.address,\n                            (   \n                                (t.task_time * t.worker_number) - (\n                                    SELECT COALESCE(SUM(task_time), 0)\n                                    FROM worker_task \n                                    WHERE task_id = t.id AND isdeleted = false\n                                ) \n                            ) AS remaining_task_time,\n                            t.bxm_id\n                        FROM task AS t\n                        JOIN batalon AS b ON b.id = t.batalon_id\n                        WHERE  t.user_id = $1 \n                            ".concat(filter_task, " \n                            AND t.contract_id = d.id \n                            AND t.isdeleted = false\n                        ORDER BY task_date\n                    ) AS subtasks\n                ) AS tasks \n            FROM contract  AS d \n            JOIN organization AS o ON o.id = d.organization_id\n            LEFT JOIN gazna_numbers g ON g.id = d.gazna_number_id\n            LEFT JOIN organ_account_numbers a ON a.id = d.organ_account_number_id\n            WHERE d.user_id = $1\n                ").concat(filter, " \n                AND d.id = $2 \n                AND d.account_number_id = $3 \n                ").concat(organization, "\n        ");
          _context9.next = 14;
          return pool.query(query, params);
        case 14:
          result = _context9.sent;
          if (result.rows[0]) {
            _context9.next = 17;
            break;
          }
          throw new ErrorResponse(lang.t("contractNotFound"), 404);
        case 17:
          return _context9.abrupt("return", result.rows[0]);
        case 20:
          _context9.prev = 20;
          _context9.t0 = _context9["catch"](4);
          throw new ErrorResponse(_context9.t0, _context9.t0.statusCode);
        case 23:
        case "end":
          return _context9.stop();
      }
    }, _callee8, null, [[4, 20]]);
  }));
  return function (_x16, _x17) {
    return _ref5.apply(this, arguments);
  };
}();
exports.dataForExcelService = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(user_id, account_number_id, from, to) {
    var _data$rows$, data;
    return _regeneratorRuntime().wrap(function _callee9$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return pool.query("--sql\n            WITH data AS (\n                SELECT \n                    d.id,\n                    d.doc_num, \n                    o.name AS organization_name,\n                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date, \n                    TO_CHAR(d.period, 'YYYY-MM-DD') AS period, \n                    d.adress, \n                    TO_CHAR(d.start_date, 'YYYY-MM-DD') AS start_date, \n                    TO_CHAR(d.end_date, 'YYYY-MM-DD') AS end_date, \n                    d.discount, \n                    d.discount_money::FLOAT, \n                    d.summa::FLOAT, \n                    d.result_summa::FLOAT, \n                    d.organization_id, \n                    d.account_number_id,\n                    a_n.account_number,\n                    d.start_time,\n                    d.end_time,\n                    d.all_worker_number,\n                    d.all_task_time,\n                    ( SELECT (d.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = d.id) AS kridit,\n                    ( SELECT COALESCE(SUM(summa), 0)::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = d.id) AS debit,\n                    (\n                        (\n                            COALESCE((SELECT SUM(summa) FROM prixod WHERE isdeleted = false AND contract_id = d.id),0)\n                        ) - \n                        (\n                            (\n                                SELECT COALESCE(SUM(t.result_summa), 0) \n                                FROM rasxod AS r\n                                JOIN task AS t ON t.id = r.task_id\n                                JOIN contract AS c_inner ON t.contract_id = c_inner.id \n                                WHERE c_inner.id = d.id AND r.isdeleted = false\n                            ) + \n                            (\n                                SELECT COALESCE(SUM(r_fio.summa), 0) \n                                FROM rasxod_fio AS r_fio \n                                JOIN worker_task AS w_t ON w_t.id = r_fio.worker_task_id\n                                JOIN task AS t ON t.id = w_t.task_id \n                                JOIN contract AS c_inner ON c_inner.id = t.contract_id\n                                WHERE c_inner.id = d.id AND r_fio.isdeleted = false\n                            )   \n                        )\n                    )::FLOAT AS remaining_summa\n                FROM contract d   \n                JOIN organization AS o ON o.id = d.organization_id\n                JOIN account_number AS a_n ON a_n.id = d.account_number_id\n                WHERE d.user_id = $1 AND d.isdeleted = false AND d.account_number_id = $2  AND d.doc_date BETWEEN $3 AND $4\n                ORDER BY CAST(d.doc_num AS FLOAT)\n            )\n            SELECT \n                ARRAY_AGG(row_to_json(data)) AS data,\n                (SELECT COALESCE(COUNT(id), 0) FROM contract WHERE user_id = $1 AND isdeleted = false AND account_number_id = $2  AND doc_date BETWEEN $3 AND $4 )::FLOAT AS total_count \n            FROM data  \n        ", [user_id, account_number_id, from, to]);
        case 3:
          data = _context10.sent;
          return _context10.abrupt("return", {
            data: ((_data$rows$ = data.rows[0]) === null || _data$rows$ === void 0 ? void 0 : _data$rows$.data) || [],
            total: data.rows[0].total_count
          });
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          throw new ErrorResponse(_context10.t0, _context10.t0.statusCode);
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function (_x18, _x19, _x20, _x21) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteContractService = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(id) {
    return _regeneratorRuntime().wrap(function _callee10$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return pool.query("UPDATE task SET isdeleted = true WHERE contract_id = $1 AND isdeleted = false", [id]);
        case 3:
          _context11.next = 5;
          return pool.query("UPDATE contract SET isdeleted = true WHERE id = $1 AND isdeleted = false", [id]);
        case 5:
          _context11.next = 10;
          break;
        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          throw new ErrorResponse(_context11.t0, _context11.t0.statusCode);
        case 10:
        case "end":
          return _context11.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function (_x22) {
    return _ref7.apply(this, arguments);
  };
}();
exports.contractViewService = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(user_id, account_number_id, id) {
    var query, data, prixods, rasxods, rasxod_fio;
    return _regeneratorRuntime().wrap(function _callee11$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          query = "\n            SELECT \n                d.id,\n                d.doc_num, \n                TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date,  \n                d.discount, \n                d.discount_money::FLOAT, \n                d.summa::FLOAT, \n                d.result_summa::FLOAT, \n                d.all_worker_number,\n                d.all_task_time,\n                d.organization_id, \n                o.name AS organization_name,\n                o.str AS organization_str,\n                o.account_number AS organization_account_number,  \n                o.bank_name AS organization_bank_name,\n                o.mfo AS organization_mfo,\n                doer.doer,\n                str.str,\n                a_c.account_number,\n                b_k.bank,\n                b_k.mfo,\n                ( SELECT (d.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = d.id) AS kridit,\n                ( SELECT COALESCE(SUM(summa), 0)::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = d.id) AS debit,\n                (\n                    (\n                        COALESCE((SELECT SUM(summa) FROM prixod WHERE isdeleted = false AND contract_id = $3),0)\n                    ) - \n                    (\n                        (\n                            SELECT COALESCE(SUM(t.result_summa), 0) \n                            FROM rasxod AS r\n                            JOIN task AS t ON t.id = r.task_id\n                            JOIN contract AS c_inner ON t.contract_id = c_inner.id \n                            WHERE c_inner.id = $3 AND r.isdeleted = false\n                        ) + \n                        (\n                            SELECT COALESCE(SUM(r_fio.summa), 0) \n                            FROM rasxod_fio AS r_fio \n                            JOIN worker_task AS w_t ON w_t.id = r_fio.worker_task_id\n                            JOIN task AS t ON t.id = w_t.task_id \n                            JOIN contract AS c_inner ON c_inner.id = t.contract_id\n                            WHERE c_inner.id = $3 AND r_fio.isdeleted = false\n                        )\n                    )\n                )::FLOAT AS remaining_summa\n            FROM contract d   \n            JOIN organization AS o ON o.id = d.organization_id\n            JOIN account_number AS a_c ON a_c.user_id = $1\n            JOIN str ON str.user_id = $1 \n            JOIN doer AS doer ON doer.user_id = $1\n            JOIN bank AS b_k ON b_k.user_id = $1\n            WHERE d.user_id = $1 AND d.isdeleted = false AND d.account_number_id = $2  AND d.id = $3\n        ";
          _context12.next = 4;
          return pool.query(query, [user_id, account_number_id, id]);
        case 4:
          data = _context12.sent;
          _context12.next = 7;
          return pool.query("--sql\n            SELECT \n                p.id, \n                p.doc_num AS prixod_doc_num,\n                TO_CHAR(p.doc_date, 'YYYY-MM-DD') AS prixod_date,\n                p.summa::FLOAT AS prixod_summa, \n                o.name AS organization_name,\n                o.str AS organization_str,\n                o.account_number AS organization_account_number\n            FROM prixod AS p \n            JOIN organization AS o ON o.id = p.organization_id \n            WHERE p.isdeleted = false AND p.contract_id = $1\n        ", [id]);
        case 7:
          prixods = _context12.sent;
          _context12.next = 10;
          return pool.query("--sql\n            SELECT \n                r_d.id, \n                r_d.doc_num, \n                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS rasxod_date, \n                t.result_summa, \n                b.name AS batalon_account_number,\n                b.str AS batalon_str,\n                b.account_number AS batalon_name\n            FROM rasxod AS r \n            JOIN task AS t ON t.id = r.task_id  \n            JOIN contract AS d ON d.id = t.contract_id\n            JOIN  batalon AS b ON b.id = t.batalon_id\n            JOIN rasxod_doc AS r_d ON r_d.id = r.rasxod_doc_id \n            WHERE t.contract_id = $1 AND r.isdeleted = false\n        ", [id]);
        case 10:
          rasxods = _context12.sent;
          _context12.next = 13;
          return pool.query("--sql\n            SELECT \n                r_d.id,\n                r_d.doc_num,\n                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS rasxod_date,\n                COALESCE(SUM(r_f.summa), 0)::FLOAT AS summa, \n                b.name AS batalon_name,\n                b.str AS batalon_str,\n                b.account_number AS batalon_account_number\n            FROM rasxod_fio_doc AS r_d\n            JOIN rasxod_fio AS r_f ON r_d.id = r_f.rasxod_fio_doc_id\n            JOIN worker_task AS w_t ON w_t.id = r_f.worker_task_id\n            JOIN task AS t ON t.id = w_t.task_id \n            JOIN batalon AS b ON b.id = t.batalon_id\n            WHERE  t.contract_id = $1\n            GROUP BY r_d.id, r_d.doc_num, rasxod_date, b.name, b.str, b.account_number \n        ", [id]);
        case 13:
          rasxod_fio = _context12.sent;
          return _context12.abrupt("return", {
            contract: data.rows[0],
            prixods: prixods.rows,
            rasxods: rasxods.rows,
            rasxod_fios: rasxod_fio.rows
          });
        case 17:
          _context12.prev = 17;
          _context12.t0 = _context12["catch"](0);
          throw new ErrorResponse(_context12.t0, _context12.t0.statusCode);
        case 20:
        case "end":
          return _context12.stop();
      }
    }, _callee11, null, [[0, 17]]);
  }));
  return function (_x23, _x24, _x25) {
    return _ref8.apply(this, arguments);
  };
}();