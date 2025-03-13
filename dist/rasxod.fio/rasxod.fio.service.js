"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var ErrorResponse = require('../utils/errorResponse');
var pool = require('../config/db');
var getByIdWorkerTaskService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(batalon_id, worker_task_id, user_id, lang) {
    var result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return pool.query("--sql\n            SELECT w_t.id \n            FROM worker_task AS w_t\n            JOIN task AS t ON t.id = w_t.task_id\n            JOIN contract AS c ON c.id = t.contract_id \n            WHERE t.batalon_id = $1 AND w_t.id = $2 AND t.user_id = $3 AND w_t.isdeleted = false AND t.isdeleted = false\n                AND  0 = (SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id)\n                AND  NOT EXISTS (SELECT * FROM rasxod_fio WHERE isdeleted = false AND worker_task_id = w_t.id)\n        ", [batalon_id, worker_task_id, user_id]);
        case 3:
          result = _context.sent;
          if (result.rows[0]) {
            _context.next = 7;
            break;
          }
          console.log(worker_task_id);
          throw new ErrorResponse(lang.t('docNotFound'), 404);
        case 7:
          return _context.abrupt("return", result.rows[0]);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          throw new ErrorResponse(_context.t0, _context.t0.statusCode);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function getByIdWorkerTaskService(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var paymentRequestService = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(account_number, batalon_id, from, to) {
    var result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return pool.query("\n            SELECT \n                w_t.id AS worker_task_id,\n                c.doc_num AS contract_doc_num,\n                c.doc_date AS contract_doc_date,\n                o.name AS organization_name,\n                o.address AS organization_address,\n                o.str AS organization_str,\n                o.bank_name AS organization_bank_name,\n                o.mfo AS organization_mfo,\n                o.account_number AS organization_account_number,\n                w.fio,\n                w_t.task_time,\n                w_t.summa::FLOAT\n            FROM worker_task AS w_t\n            JOIN task AS t ON t.id = w_t.task_id\n            JOIN worker AS w ON w_t.worker_id = w.id\n            JOIN contract AS c ON c.id = t.contract_id\n            JOIN organization AS o ON o.id = c.organization_id\n            WHERE c.account_number_id = $1  \n                AND c.doc_date BETWEEN $2 AND $3 \n                AND t.batalon_id = $4 \n                AND c.isdeleted = false\n                AND  0 = (\n                        SELECT \n                            (c.result_summa - COALESCE(SUM(p.summa), 0))::FLOAT \n                        FROM prixod p\n                        WHERE p.isdeleted = false \n                            AND p.contract_id = c.id\n                    )\n                AND  NOT EXISTS (\n                        SELECT 1 \n                        FROM rasxod_fio rf \n                        WHERE rf.isdeleted = false \n                            AND rf.worker_task_id = w_t.id\n                    )\n                AND w_t.isdeleted = false\n        ", [account_number, from, to, batalon_id]);
        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", result.rows);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw new ErrorResponse(_context2.t0, _context2.t0.statusCode);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function paymentRequestService(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
var createRasxodDocService = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
    var client, rasxod_fio_doc, rasxod_fio, queryArray, deductionQueryArray, _iterator, _step, worker_task, worker_task_summa, summa, _iterator3, _step3, element, percent, _iterator2, _step2, deduction, rasxods, deductions;
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
          _context3.next = 8;
          return client.query("\n            INSERT INTO rasxod_fio_doc(\n                doc_num, \n                doc_date, \n                batalon_id, \n                user_id, \n                opisanie, \n                account_number_id, \n                \"from\",\n                \"to\",\n                batalon_account_number_id, \n                batalon_gazna_number_id\n            ) \n            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) \n            RETURNING * \n        ", [data.doc_num, data.doc_date, data.batalon_id, data.user_id, data.opisanie, data.account_number_id, data.from, data.to, data.batalon_account_number_id, data.batalon_gazna_number_id]);
        case 8:
          rasxod_fio_doc = _context3.sent;
          rasxod_fio = rasxod_fio_doc.rows[0];
          queryArray = [];
          deductionQueryArray = [];
          _iterator = _createForOfIteratorHelper(data.worker_tasks);
          _context3.prev = 13;
          _iterator.s();
        case 15:
          if ((_step = _iterator.n()).done) {
            _context3.next = 28;
            break;
          }
          worker_task = _step.value;
          _context3.next = 19;
          return client.query("SELECT summa FROM worker_task WHERE id = $1", [worker_task.worker_task_id]);
        case 19:
          worker_task_summa = _context3.sent;
          worker_task_summa = worker_task_summa.rows[0].summa;
          summa = worker_task_summa;
          _iterator3 = _createForOfIteratorHelper(data.deductions);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              element = _step3.value;
              percent = element.percent / 100;
              summa = summa - summa * percent;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          summa = Math.round(summa * 100) / 100;
          queryArray.push(client.query("\n                INSERT INTO rasxod_fio(worker_task_id, rasxod_fio_doc_id, summa)\n                VALUES($1, $2, $3) RETURNING *", [worker_task.worker_task_id, rasxod_fio.id, summa]));
        case 26:
          _context3.next = 15;
          break;
        case 28:
          _context3.next = 33;
          break;
        case 30:
          _context3.prev = 30;
          _context3.t0 = _context3["catch"](13);
          _iterator.e(_context3.t0);
        case 33:
          _context3.prev = 33;
          _iterator.f();
          return _context3.finish(33);
        case 36:
          _iterator2 = _createForOfIteratorHelper(data.deductions);
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              deduction = _step2.value;
              deductionQueryArray.push(client.query("INSERT INTO rasxod_fio_deduction(deduction_id, rasxod_fio_doc_id) VALUES($1, $2) RETURNING *", [deduction.id, rasxod_fio.id]));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          _context3.next = 40;
          return Promise.all(queryArray);
        case 40:
          rasxods = _context3.sent;
          _context3.next = 43;
          return Promise.all(deductionQueryArray);
        case 43:
          deductions = _context3.sent;
          rasxod_fio.tasks = rasxods.map(function (item) {
            return item.rows[0];
          });
          rasxod_fio.deductions = deductions.map(function (item) {
            return item.rows[0];
          });
          _context3.next = 48;
          return client.query("COMMIT");
        case 48:
          return _context3.abrupt("return", rasxod_fio);
        case 51:
          _context3.prev = 51;
          _context3.t1 = _context3["catch"](3);
          _context3.next = 55;
          return client.query("ROLLBACK");
        case 55:
          throw new ErrorResponse(_context3.t1, _context3.t1.statusCode);
        case 56:
          _context3.prev = 56;
          client.release();
          return _context3.finish(56);
        case 59:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 51, 56, 59], [13, 30, 33, 36]]);
  }));
  return function createRasxodDocService(_x9) {
    return _ref3.apply(this, arguments);
  };
}();
var getRasxodService = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(user_id, account_number_id, from, to, offset, limit, batalon_id) {
    var _result$rows$, params, batalon_filter, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          params = [account_number_id, from, to, user_id, offset, limit];
          batalon_filter = "";
          if (batalon_id) {
            batalon_filter = " AND d.batalon_id = $".concat(params.length + 1);
            params.push(batalon_id);
          }
          _context4.next = 6;
          return pool.query("\n            WITH data AS (\n                SELECT \n                    d.id,\n                    d.doc_num,\n                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date,  -- Yil, oy, kun formatini to'g'ri ko'rsatish\n                    d.opisanie,\n                    b.id AS batalon_id,\n                    b.name AS batalon_name,\n                    b.address AS batalon_address,\n                    b.str AS batalon_str,\n                    b.bank_name AS batalon_bank_name,\n                    b.mfo AS batalon_mfo,\n                    d.batalon_gazna_number_id,\n                    d.batalon_account_number_id,\n                    g.gazna_number,\n                    a.account_number,\n                    (\n                        SELECT COALESCE(SUM(r.summa), 0) AS summa\n                        FROM rasxod_fio AS r\n                        WHERE r.rasxod_fio_doc_id = d.id AND r.isdeleted = false\n                    ) AS summa,\n                    b.name AS batalon_name\n                FROM rasxod_fio_doc AS d\n                JOIN batalon AS b ON b.id = d.batalon_id \n                LEFT JOIN account_number a ON a.id = d.batalon_account_number_id \n                LEFT JOIN gazna_numbers g ON g.id = d.batalon_gazna_number_id\n                WHERE d.account_number_id = $1 \n                AND d.isdeleted = false\n                AND d.doc_date BETWEEN $2 AND $3\n                AND d.user_id = $4 ".concat(batalon_filter, " AND d.isdeleted = false\n                OFFSET $5 LIMIT $6\n            )\n            SELECT \n                ARRAY_AGG(ROW_TO_JSON(data)) AS data,\n                (\n                    SELECT COALESCE(COUNT(id), 0)::INTEGER  \n                    FROM rasxod_fio_doc AS d \n                    WHERE d.account_number_id = $1 \n                    AND d.doc_date BETWEEN $2 AND $3 \n                    AND d.user_id = $4 ").concat(batalon_filter, " AND d.isdeleted = false\n                ) AS total_count,\n                (\n                    SELECT COALESCE(SUM(r.summa), 0)::FLOAT AS summa\n                    FROM rasxod_fio AS r\n                    JOIN rasxod_fio_doc AS d ON d.id = r.rasxod_fio_doc_id\n                    WHERE r.isdeleted = false AND d.doc_date < $2  AND d.isdeleted = false ").concat(batalon_filter, " AND d.isdeleted = false\n                ) AS summa_from,\n                 (\n                    SELECT COALESCE(SUM(r.summa), 0)::FLOAT AS summa\n                    FROM rasxod_fio AS r\n                    JOIN rasxod_fio_doc AS d ON d.id = r.rasxod_fio_doc_id\n                    WHERE r.isdeleted = false AND d.doc_date < $3  AND d.isdeleted = false ").concat(batalon_filter, " AND d.isdeleted = false\n                ) AS summa_to\n            FROM data\n        "), params);
        case 6:
          result = _context4.sent;
          return _context4.abrupt("return", {
            data: ((_result$rows$ = result.rows[0]) === null || _result$rows$ === void 0 ? void 0 : _result$rows$.data) || [],
            total: result.rows[0].total_count,
            summa_from: result.rows[0].summa_from,
            summa_to: result.rows[0].summa_to
          });
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          throw new ErrorResponse(_context4.t0, _context4.t0.statusCode);
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function getRasxodService(_x10, _x11, _x12, _x13, _x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
}();
var getByIdRasxodService = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(user_id, account_number_id, id) {
    var ignore,
      lang,
      ignore_filter,
      data,
      _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          ignore = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : false;
          lang = _args5.length > 4 ? _args5[4] : undefined;
          _context5.prev = 2;
          ignore_filter = "";
          if (!ignore) {
            ignore_filter = "AND d.isdeleted = false";
          }
          _context5.next = 7;
          return pool.query("\n            SELECT \n                d.id,\n                d.doc_num,\n                TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date,\n                d.opisanie,\n                b.id AS batalon_id,\n                b.name AS batalon_name,\n                b.address AS batalon_address,\n                b.str AS batalon_str,\n                b.bank_name AS batalon_bank_name,\n                b.mfo AS batalon_mfo,\n                d.batalon_gazna_number_id,\n                d.batalon_account_number_id,\n                g.gazna_number,\n                a.account_number,\n                TO_CHAR(d.from, 'YYYY-MM-DD') AS from,\n                TO_CHAR(d.to, 'YYYY-MM-DD') AS to,\n                (\n                    SELECT COALESCE(SUM(r.summa), 0)::FLOAT AS summa\n                    FROM rasxod_fio AS r\n                    WHERE r.rasxod_fio_doc_id = d.id \n                ) AS summa,\n                COALESCE((   SELECT \n                        ARRAY_AGG(JSON_BUILD_OBJECT('deduction_id', d.id, 'deduction_name', d.name, 'percent', d.percent) ORDER BY r_d_d.id)\n                    FROM deduction AS d\n                    JOIN rasxod_fio_deduction AS r_d_d ON r_d_d.deduction_id = d.id\n                    WHERE r_d_d.rasxod_fio_doc_id = d.id\n                ), ARRAY[]::JSON[]) AS deductions,\n                (\n                    SELECT \n                        ARRAY_AGG(ROW_TO_JSON(task))\n                    FROM (\n                        SELECT \n                            c.doc_num AS contract_doc_num,\n                            c.doc_date AS contract_doc_date,\n                            o.name AS organization_name,\n                            o.address AS organization_address,\n                            o.str AS organization_str,\n                            o.bank_name AS organization_bank_name,\n                            o.mfo AS organization_mfo,\n                            o.account_number AS organization_account_number,\n                            w_t.id AS worker_task_id,\n                            w_t.task_time,\n                            w_t.summa,\n                            ( w_t.summa - r.summa )::FLOAT AS deduction_money ,\n                            r.summa::FLOAT  AS result_summa,\n                            w.account_number,\n                            w.xisob_raqam,\n                            w.fio\n                        FROM rasxod_fio AS r \n                        LEFT JOIN worker_task AS w_t ON r.worker_task_id = w_t.id\n                        LEFT JOIN worker AS w ON w.id = w_t.worker_id\n                        LEFT JOIN task AS t ON t.id = w_t.task_id \n                        LEFT JOIN contract AS c ON c.id = t.contract_id\n                        LEFT JOIN organization AS o ON o.id = c.organization_id\n                        WHERE r.rasxod_fio_doc_id = $3\n                    ) AS task\n                ) AS worker_tasks \n            FROM rasxod_fio_doc AS d\n            LEFT JOIN batalon AS b ON b.id = d.batalon_id\n            LEFT JOIN gazna_numbers g ON g.id = d.batalon_gazna_number_id\n            LEFT JOIN account_number a ON a.id = d.batalon_account_number_id \n            WHERE d.account_number_id = $1 \n                AND d.user_id = $2 \n                AND d.id = $3  \n                ".concat(ignore_filter, "\n        "), [account_number_id, user_id, id]);
        case 7:
          data = _context5.sent;
          if (data.rows[0]) {
            _context5.next = 10;
            break;
          }
          throw new ErrorResponse(lang.t('docNotFound'), 404);
        case 10:
          return _context5.abrupt("return", data.rows[0]);
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](2);
          throw new ErrorResponse(_context5.t0, _context5.t0.statusCode);
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 13]]);
  }));
  return function getByIdRasxodService(_x17, _x18, _x19) {
    return _ref5.apply(this, arguments);
  };
}();
var deeleteRasxodService = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return pool.query("UPDATE rasxod_fio SET isdeleted = true WHERE rasxod_fio_doc_id = $1 AND isdeleted = false", [id]);
        case 3:
          _context6.next = 5;
          return pool.query("UPDATE rasxod_fio_deduction SET isdeleted = true WHERE rasxod_fio_doc_id = $1 AND isdeleted = false", [id]);
        case 5:
          _context6.next = 7;
          return pool.query("UPDATE rasxod_fio_doc SET isdeleted = true WHERE id = $1 AND isdeleted = false", [id]);
        case 7:
          _context6.next = 12;
          break;
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
  return function deeleteRasxodService(_x20) {
    return _ref6.apply(this, arguments);
  };
}();
var updateRasxodService = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data) {
    var client, rasxod_fio_doc, rasxod_fio, queryArray, deductionQueryArray, _iterator4, _step4, worker_task, worker_task_summa, summa, _iterator6, _step6, element, percent, _iterator5, _step5, deduction, rasxods, deductions;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return pool.connect();
        case 2:
          client = _context7.sent;
          _context7.prev = 3;
          _context7.next = 6;
          return client.query("BEGIN");
        case 6:
          _context7.next = 8;
          return client.query("UPDATE rasxod_fio_doc SET \n            doc_num = $1, \n            doc_date = $2, \n            batalon_id = $3, \n            opisanie = $4,\n            \"from\" = $5,\n            \"to\" = $6,\n            batalon_account_number_id = $7, \n            batalon_gazna_number_id = $8\n            WHERE id = $9\n            RETURNING * \n        ", [data.doc_num, data.doc_date, data.batalon_id, data.opisanie, data.from, data.to, data.batalon_account_number_id, data.batalon_gazna_number_id, data.id]);
        case 8:
          rasxod_fio_doc = _context7.sent;
          rasxod_fio = rasxod_fio_doc.rows[0];
          _context7.next = 12;
          return client.query("DELETE FROM rasxod_fio WHERE rasxod_fio_doc_id = $1", [data.id]);
        case 12:
          _context7.next = 14;
          return client.query("DELETE FROM rasxod_fio_deduction WHERE rasxod_fio_doc_id = $1", [data.id]);
        case 14:
          queryArray = [];
          deductionQueryArray = [];
          _iterator4 = _createForOfIteratorHelper(data.worker_tasks);
          _context7.prev = 17;
          _iterator4.s();
        case 19:
          if ((_step4 = _iterator4.n()).done) {
            _context7.next = 32;
            break;
          }
          worker_task = _step4.value;
          _context7.next = 23;
          return client.query("SELECT summa FROM worker_task WHERE id = $1", [worker_task.worker_task_id]);
        case 23:
          worker_task_summa = _context7.sent;
          worker_task_summa = worker_task_summa.rows[0].summa;
          summa = worker_task_summa;
          _iterator6 = _createForOfIteratorHelper(data.deductions);
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              element = _step6.value;
              percent = element.percent / 100;
              summa = summa - summa * percent;
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
          summa = Math.round(summa * 100) / 100;
          queryArray.push(client.query("\n                INSERT INTO rasxod_fio(worker_task_id, rasxod_fio_doc_id, summa)\n                VALUES($1, $2, $3) RETURNING *", [worker_task.worker_task_id, rasxod_fio.id, summa]));
        case 30:
          _context7.next = 19;
          break;
        case 32:
          _context7.next = 37;
          break;
        case 34:
          _context7.prev = 34;
          _context7.t0 = _context7["catch"](17);
          _iterator4.e(_context7.t0);
        case 37:
          _context7.prev = 37;
          _iterator4.f();
          return _context7.finish(37);
        case 40:
          _iterator5 = _createForOfIteratorHelper(data.deductions);
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              deduction = _step5.value;
              deductionQueryArray.push(client.query("INSERT INTO rasxod_fio_deduction(deduction_id, rasxod_fio_doc_id) VALUES($1, $2) RETURNING *", [deduction.id, rasxod_fio.id]));
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          _context7.next = 44;
          return Promise.all(queryArray);
        case 44:
          rasxods = _context7.sent;
          _context7.next = 47;
          return Promise.all(deductionQueryArray);
        case 47:
          deductions = _context7.sent;
          rasxod_fio.tasks = rasxods.map(function (item) {
            return item.rows[0];
          });
          rasxod_fio.deductions = deductions.map(function (item) {
            return item.rows[0];
          });
          _context7.next = 52;
          return client.query("COMMIT");
        case 52:
          return _context7.abrupt("return", rasxod_fio);
        case 55:
          _context7.prev = 55;
          _context7.t1 = _context7["catch"](3);
          _context7.next = 59;
          return client.query("ROLLBACK");
        case 59:
          throw new ErrorResponse(_context7.t1, _context7.t1.statusCode);
        case 60:
          _context7.prev = 60;
          client.release();
          return _context7.finish(60);
        case 63:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 55, 60, 63], [17, 34, 37, 40]]);
  }));
  return function updateRasxodService(_x21) {
    return _ref7.apply(this, arguments);
  };
}();
module.exports = {
  paymentRequestService: paymentRequestService,
  createRasxodDocService: createRasxodDocService,
  getByIdWorkerTaskService: getByIdWorkerTaskService,
  getRasxodService: getRasxodService,
  getByIdRasxodService: getByIdRasxodService,
  deeleteRasxodService: deeleteRasxodService,
  updateRasxodService: updateRasxodService
};