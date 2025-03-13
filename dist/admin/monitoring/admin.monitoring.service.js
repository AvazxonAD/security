"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var pool = require('../../config/db');
var ErrorResponse = require('../../utils/errorResponse');
var prixodRasxodService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(from, to, offset, limit, user_id) {
    var user_filter, params, _yield$pool$query, rows, total_params, user_filter_total, total, summa_from_params, summa_to_params, user_date_filter, prixod_from, prixod_summa_from, rasxod_from, rasxod_summa_from, rasxod_fio_from, rasxod_fio_summa_from, summa_from, prixod_to, prixod_summa_to, rasxod_to, rasxod_summa_to, rasxod_fio_to, rasxod_fio_summa_to, summa_to, prixod, rasxod;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user_filter = "";
          params = [from, to, offset, limit];
          if (user_id) {
            user_filter = "AND u.id = $".concat(params.length + 1);
            params.push(user_id);
          }
          _context.next = 6;
          return pool.query("--sql\n            SELECT \n                u.id AS user_id,\n                d.doer AS doer_name,\n                a.adress AS doer_address,\n                s.str AS doer_inn,\n                a_n.account_number AS doer_account_number,\n                boss.boss AS doer_boss,\n                b.bank AS doer_bank_name,\n                b.mfo AS doer_bank_mfo,\n                t.id AS tashkilot_id,\n                t.name AS tashkilot_name,\n                t.address AS tashkilot_address,\n                t.str AS tashkilot_inn,\n                t.account_number AS tashkilot_account_number,\n                p.id,\n                p.doc_num,\n                TO_CHAR(p.doc_date, 'YYYY-MM-DD') AS doc_date,\n                p.opisanie,\n                0::FLOAT AS rasxod_sum,\n                p.summa::FLOAT AS prixod_sum    \n            FROM prixod AS p \n            JOIN users AS u ON u.id = p.user_id\n            LEFT JOIN doer AS d ON d.user_id = u.id\n            LEFT JOIN adress AS a ON a.user_id = u.id\n            LEFT JOIN str AS s ON s.user_id = u.id\n            LEFT JOIN account_number AS a_n ON a_n.user_id = u.id\n            LEFT JOIN boss ON boss.user_id = u.id\n            LEFT JOIN bank AS b ON b.user_id = u.id\n            JOIN contract AS c ON c.id = p.contract_id\n            JOIN organization AS t ON t.id = c.organization_id\n            WHERE p.isdeleted = false AND p.doc_date BETWEEN $1 AND $2 AND c.isdeleted = false ".concat(user_filter, "\n\n            UNION ALL \n\n            SELECT \n                u.id AS user_id,\n                d.doer AS doer_name,\n                a.adress AS doer_address,\n                s.str AS doer_inn,\n                a_n.account_number AS doer_account_number,\n                boss.boss AS doer_boss,\n                b.bank AS doer_bank_name,\n                b.mfo AS doer_bank_mfo,\n                t.id AS tashkilot_id,\n                t.name AS tashkilot_name,\n                t.address AS tashkilot_address,\n                t.str AS tashkilot_inn,\n                t.account_number AS tashkilot_account_number,\n                r_d.id,\n                r_d.doc_num,\n                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS doc_date,\n                r_d.opisanie,\n                COALESCE(SUM(t_k.result_summa), 0)::FLOAT AS rasxod_sum,\n                0::FLOAT AS prixod_sum\n            FROM rasxod_doc AS r_d\n            JOIN users AS u ON u.id = r_d.user_id\n            LEFT JOIN doer AS d ON d.user_id = u.id\n            LEFT JOIN adress AS a ON a.user_id = u.id\n            LEFT JOIN str AS s ON s.user_id = u.id\n            LEFT JOIN account_number AS a_n ON a_n.user_id = u.id\n            LEFT JOIN boss ON boss.user_id = u.id\n            LEFT JOIN bank AS b ON b.user_id = u.id\n            JOIN rasxod AS r ON r_d.id = r.rasxod_doc_id\n            JOIN task AS t_k ON t_k.id = r.task_id\n            JOIN contract AS c ON c.id = t_k.contract_id\n            JOIN batalon AS t ON t.id = t_k.batalon_id\n            WHERE r_d.isdeleted = false AND r_d.doc_date BETWEEN $1 AND $2 AND c.isdeleted = false ").concat(user_filter, "\n            GROUP BY t.id, t.name, t.address, t.str, r_d.id, r_d.doc_num, r_d.doc_date, r_d.opisanie, u.id, d.doer, a.adress, s.str, a_n.account_number,boss.boss, b.bank, b.mfo\n\n            UNION ALL \n\n            SELECT \n                u.id AS user_id,\n                d.doer AS doer_name,\n                a.adress AS doer_address,\n                s.str AS doer_inn,\n                a_n.account_number AS doer_account_number,\n                boss.boss AS doer_boss,\n                b.bank AS doer_bank_name,\n                b.mfo AS doer_bank_mfo,\n                t.id AS tashkilot_id,\n                t.name AS tashkilot_name,\n                t.address AS tashkilot_address,\n                t.str AS tashkilot_inn,\n                t.account_number AS tashkilot_account_number,\n                r_d.id,\n                r_d.doc_num,\n                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS doc_date,\n                r_d.opisanie,\n                COALESCE(SUM(r.summa), 0)::FLOAt AS rasxod_sum,\n                0::FLOAT AS prixod_sum    \n            FROM rasxod_fio_doc AS r_d\n            JOIN users AS u ON u.id = r_d.user_id\n            LEFT JOIN doer AS d ON d.user_id = u.id\n            LEFT JOIN adress AS a ON a.user_id = u.id\n            LEFT JOIN str AS s ON s.user_id = u.id\n            LEFT JOIN account_number AS a_n ON a_n.user_id = u.id\n            LEFT JOIN boss ON boss.user_id = u.id\n            LEFT JOIN bank AS b ON b.user_id = u.id\n            JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id\n            JOIN worker_task AS w_t ON w_t.id = r.worker_task_id\n            JOIN task AS t_k ON t_k.id = w_t.task_id\n            JOIN contract AS c ON c.id = t_k.contract_id\n            JOIN batalon AS t ON t.id = t_k.batalon_id \n            WHERE r_d.isdeleted = false AND r_d.doc_date BETWEEN $1 AND $2 AND c.isdeleted = false ").concat(user_filter, "\n            GROUP BY t.id, t.name, t.address, t.str, r_d.id, r_d.doc_num, r_d.doc_date, r_d.opisanie, u.id, d.doer, a.adress, s.str, a_n.account_number,boss.boss, b.bank, b.mfo\n            ORDER BY doc_date\n            OFFSET $3 LIMIT $4\n        "), params);
        case 6:
          _yield$pool$query = _context.sent;
          rows = _yield$pool$query.rows;
          total_params = [from, to];
          user_filter_total = '';
          if (user_id) {
            user_filter_total = "AND u.id = $".concat(total_params.length + 1);
            total_params.push(user_id);
          }
          _context.next = 13;
          return pool.query("--sql\n            SELECT \n                (SELECT COALESCE(COUNT(p.id), 0)::INTEGER \n                FROM prixod AS p \n                JOIN users AS u ON u.id = p.user_id\n                JOIN contract AS c ON c.id = p.contract_id\n                JOIN organization AS t ON t.id = c.organization_id\n                WHERE p.isdeleted = false AND  p.doc_date BETWEEN $1 AND $2 AND c.isdeleted = false ".concat(user_filter_total, ") + \n                (SELECT COALESCE(COUNT( DISTINCT r_d.id), 0)::INTEGER\n                FROM rasxod_doc AS r_d\n                JOIN users AS u ON u.id = r_d.user_id\n                JOIN rasxod AS r ON r_d.id = r.rasxod_doc_id\n                JOIN task AS t_k ON t_k.id = r.task_id\n                JOIN contract AS c ON c.id = t_k.contract_id\n                JOIN batalon AS t ON t.id = t_k.batalon_id\n                WHERE r_d.isdeleted = false AND r_d.doc_date BETWEEN $1 AND $2 AND c.isdeleted = false ").concat(user_filter_total, ") + \n                (SELECT COALESCE(COUNT(DISTINCT r_d.id), 0)::INTEGER  \n                FROM rasxod_fio_doc AS r_d\n                JOIN users AS u ON u.id = r_d.user_id\n                JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id\n                JOIN worker_task AS w_t ON w_t.id = r.worker_task_id\n                JOIN task AS t_k ON t_k.id = w_t.task_id\n                JOIN contract AS c ON c.id = t_k.contract_id\n                JOIN batalon AS t ON t.id = t_k.batalon_id\n                WHERE r_d.isdeleted = false AND  r_d.doc_date BETWEEN $1 AND $2 AND c.isdeleted = false ").concat(user_filter_total, ") AS total_count\n        "), total_params);
        case 13:
          total = _context.sent;
          summa_from_params = [from];
          summa_to_params = [to];
          user_date_filter = "";
          if (user_id) {
            user_date_filter = "AND u.id = $2";
            summa_from_params.push(user_id);
            summa_to_params.push(user_id);
          }
          _context.next = 20;
          return pool.query("--sql\n            SELECT COALESCE(SUM(p.summa), 0)::FLOAT AS summa \n            FROM prixod AS p \n            JOIN users AS u ON u.id = p.user_id\n            JOIN contract AS c ON c.id = p.contract_id\n            WHERE p.doc_date < $1 AND c.isdeleted = false AND p.isdeleted = false ".concat(user_date_filter, "\n        "), summa_from_params);
        case 20:
          prixod_from = _context.sent;
          prixod_summa_from = prixod_from.rows.length > 0 ? prixod_from.rows[0].summa : 0;
          _context.next = 24;
          return pool.query("--sql\n            SELECT \n                COALESCE(SUM(t_k.result_summa), 0)::FLOAT AS summa\n            FROM rasxod_doc AS r_d\n            JOIN users AS u ON u.id = r_d.user_id\n            JOIN rasxod AS r ON r_d.id = r.rasxod_doc_id\n            LEFT JOIN task AS t_k ON t_k.id = r.task_id\n            LEFT JOIN contract AS c ON c.id = t_k.contract_id\n            LEFT JOIN batalon AS t ON t.id = t_k.batalon_id\n            WHERE r_d.isdeleted = false AND r_d.doc_date < $1 AND c.isdeleted = false ".concat(user_date_filter, "\n        "), summa_from_params);
        case 24:
          rasxod_from = _context.sent;
          rasxod_summa_from = rasxod_from.rows.length > 0 ? rasxod_from.rows[0].summa : 0;
          _context.next = 28;
          return pool.query("--sql\n            SELECT \n            COALESCE(SUM(r.summa), 0)::FLOAT AS summa \n            FROM rasxod_fio_doc AS r_d\n            JOIN users AS u ON u.id = r_d.user_id\n            JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id\n            JOIN worker_task AS w_t ON w_t.id = r.worker_task_id\n            JOIN task AS t_k ON t_k.id = w_t.task_id\n            JOIN contract AS c ON c.id = t_k.contract_id\n            JOIN batalon AS t ON t.id = t_k.batalon_id\n            WHERE r_d.isdeleted = false AND r_d.doc_date < $1 AND c.isdeleted = false ".concat(user_date_filter, "\n        "), summa_from_params);
        case 28:
          rasxod_fio_from = _context.sent;
          rasxod_fio_summa_from = rasxod_fio_from.rows.length > 0 ? rasxod_fio_from.rows[0].summa : 0;
          summa_from = prixod_summa_from - (rasxod_fio_summa_from + rasxod_summa_from);
          _context.next = 33;
          return pool.query("--sql\n            SELECT COALESCE(SUM(p.summa), 0)::FLOAT AS summa \n            FROM prixod AS p \n            JOIN users AS u ON u.id = p.user_id\n            JOIN contract AS c ON c.id = p.contract_id\n            WHERE p.doc_date < $1 AND c.isdeleted = false AND p.isdeleted = false ".concat(user_date_filter, "\n        "), summa_to_params);
        case 33:
          prixod_to = _context.sent;
          prixod_summa_to = prixod_to.rows.length > 0 ? prixod_to.rows[0].summa : 0;
          _context.next = 37;
          return pool.query("--sql\n            SELECT \n            COALESCE(SUM(t_k.result_summa), 0)::FLOAT AS summa\n            FROM rasxod AS r\n            JOIN rasxod_doc AS r_d ON r_d.id = r.rasxod_doc_id\n            JOIN users AS u ON u.id = r_d.user_id\n            JOIN task AS t_k ON t_k.id = r.task_id\n            JOIN contract AS c ON c.id = t_k.contract_id\n            JOIN batalon AS t ON t.id = t_k.batalon_id\n            WHERE r_d.isdeleted = false AND r_d.doc_date < $1 AND c.isdeleted = false ".concat(user_date_filter, "\n        "), summa_to_params);
        case 37:
          rasxod_to = _context.sent;
          rasxod_summa_to = rasxod_to.rows.length > 0 ? rasxod_to.rows[0].summa : 0;
          _context.next = 41;
          return pool.query("--sql\n            SELECT \n            COALESCE(SUM(r.summa), 0)::FLOAT AS summa\n            FROM rasxod_fio_doc AS r_d\n            JOIN users AS u ON u.id = r_d.user_id\n            JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id\n            JOIN worker_task AS w_t ON w_t.id = r.worker_task_id\n            JOIN task AS t_k ON t_k.id = w_t.task_id\n            JOIN contract AS c ON c.id = t_k.contract_id\n            WHERE r_d.isdeleted = false AND r_d.doc_date < $1 AND c.isdeleted = false ".concat(user_date_filter, "\n        "), summa_to_params);
        case 41:
          rasxod_fio_to = _context.sent;
          rasxod_fio_summa_to = rasxod_fio_to.rows.length > 0 ? rasxod_fio_to.rows[0].summa : 0;
          summa_to = prixod_summa_to - (rasxod_fio_summa_to + rasxod_summa_to);
          prixod = 0;
          rasxod = 0;
          rows.forEach(function (item) {
            prixod += item.prixod_sum, rasxod += item.rasxod_sum;
          });
          return _context.abrupt("return", {
            rows: rows,
            total: total.rows[0].total_count,
            summa_from: summa_from,
            summa_to: summa_to,
            prixod: prixod,
            rasxod: rasxod
          });
        case 50:
          _context.prev = 50;
          _context.t0 = _context["catch"](0);
          throw new ErrorResponse(_context.t0, _context.t0.statusCode);
        case 53:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 50]]);
  }));
  return function prixodRasxodService(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var monitoringService = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(year, month, user_id) {
    var params, params_2, user_filter, user_filter_2, byUser, itogo, colors, i, result, user_result, month_sum, itogo_year, _i, _result, _i2, workers, batalons;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          params = [];
          params_2 = [year, month];
          user_filter = "";
          user_filter_2 = "";
          if (user_id) {
            user_filter = "AND u.region_id = $".concat(params.length + 1);
            user_filter_2 = "AND u.region_id = $".concat(params_2.length + 1);
            params.push(user_id);
            params_2.push(user_id);
          }
          _context2.next = 8;
          return pool.query("--sql\n            SELECT \n                u.id,\n                u.region_id,\n                r.name AS region_name\n            FROM users AS u\n            JOIN regions AS r ON r.id = u.region_id\n            WHERE u.isdeleted = false AND u.region_id IS NOT NULL ".concat(user_filter, "\n        "), params);
        case 8:
          byUser = _context2.sent;
          itogo = 0;
          colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FFD133", "#33FFF3", "#C70039", "#900C3F", "#581845", "#DAF7A6", "#FFC300", "#1ABC9C", "#8E44AD", "#FF5733"];
          i = 1;
        case 12:
          if (!(i <= byUser.rows.length)) {
            _context2.next = 24;
            break;
          }
          _context2.next = 15;
          return pool.query("--sql\n                SELECT \n                    COALESCE(SUM(c.result_summa), 0)::FLOAT AS sum,\n                    COALESCE(COUNT(c.id), 0)::INTEGER AS count,\n                    COALESCE(SUM(c.id), 0)::FLOAT AS task_time\n                FROM contract AS c\n                WHERE c.isdeleted = false \n                AND c.user_id = $1\n                AND 0 = ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id)\n                AND EXTRACT(YEAR FROM c.doc_date) = $2\n                AND EXTRACT(MONTH FROM c.doc_date) = $3\n            ", [byUser.rows[i - 1].id, year, month]);
        case 15:
          result = _context2.sent;
          byUser.rows[i - 1].summa = result.rows[0].sum;
          byUser.rows[i - 1].count = result.rows[0].count;
          byUser.rows[i - 1].task_time = result.rows[0].task_time;
          byUser.rows[i - 1].color = colors[i - 1] || colors[0];
          itogo += byUser.rows[i - 1].summa;
        case 21:
          i++;
          _context2.next = 12;
          break;
        case 24:
          ;
          user_result = byUser.rows.map(function (item) {
            if (item.summa === 0) {
              item.percent = 0;
            } else {
              item.percent = Math.round(item.summa * 100 / itogo * 100) / 100;
            }
            return item;
          });
          month_sum = {};
          itogo_year = 0;
          _i = 1;
        case 29:
          if (!(_i <= 12)) {
            _context2.next = 38;
            break;
          }
          _context2.next = 32;
          return pool.query("--sql\n                SELECT \n                    COALESCE(SUM(c.result_summa), 0)::FLOAT AS sum\n                FROM contract AS c\n                JOIN users AS u ON u.id = c.user_id \n                WHERE c.isdeleted = false ".concat(user_filter, " \n                AND 0 = (SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT \n                    FROM prixod \n                    WHERE isdeleted = false AND contract_id = c.id)\n                AND EXTRACT(YEAR FROM c.doc_date) = $1\n                AND EXTRACT(MONTH FROM c.doc_date) = $2\n            "), [year, _i]);
        case 32:
          _result = _context2.sent;
          month_sum["oy_".concat(_i)] = _result.rows[0].sum;
          itogo_year += _result.rows[0].sum;
        case 35:
          _i++;
          _context2.next = 29;
          break;
        case 38:
          for (_i2 = 1; _i2 <= 12; _i2++) {
            month_sum["oy_".concat(_i2, "_percent")] = itogo_year > 0 ? Math.round(month_sum["oy_".concat(_i2)] * 100 / itogo_year * 100) / 100 : 0;
          }
          _context2.next = 41;
          return pool.query("--sql\n            SELECT \n                w.id,\n                w.fio,\n                u.region_id,\n                r.name AS region_name,\n                b.name AS batalon_name,\n                (\n                    SELECT COALESCE(SUM(w_t.summa), 0)::FLOAT\n                    FROM worker_task AS w_t\n                    JOIN task AS t ON t.id = w_t.task_id\n                    JOIN contract AS c ON c.id = t.contract_id\n                    WHERE w_t.worker_id = w.id  AND w_t.isdeleted = false\n                    AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT \n                        FROM prixod \n                        WHERE isdeleted = false AND contract_id = c.id),0\n                    )\n                    AND EXTRACT(YEAR FROM c.doc_date) = $1\n                    AND EXTRACT(MONTH FROM c.doc_date) = $2\n                ) AS summa,\n                (\n                    SELECT COALESCE(SUM(w_t.task_time), 0)::FLOAT\n                    FROM worker_task AS w_t\n                    JOIN task AS t ON t.id = w_t.task_id\n                    JOIN contract AS c ON c.id = t.contract_id\n                    WHERE w_t.worker_id = w.id  AND w_t.isdeleted = false\n                    AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT \n                        FROM prixod \n                        WHERE isdeleted = false AND contract_id = c.id),0\n                    )\n                    AND EXTRACT(YEAR FROM c.doc_date) = $1\n                    AND EXTRACT(MONTH FROM c.doc_date) = $2\n                ) AS task_time \n            FROM worker AS w \n            JOIN batalon AS b ON b.id = w.batalon_id\n            JOIN users AS u ON u.id = b.user_id\n            JOIN regions AS r ON r.id = u.region_id\n            WHERE w.isdeleted = false ".concat(user_filter_2, "  AND 0 < (\n                SELECT COALESCE(SUM(w_t.task_time), 0)::FLOAT\n                FROM worker_task AS w_t\n                JOIN task AS t ON t.id = w_t.task_id\n                JOIN contract AS c ON c.id = t.contract_id\n                WHERE w_t.worker_id = w.id  AND w_t.isdeleted = false\n                AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT \n                    FROM prixod \n                    WHERE isdeleted = false AND contract_id = c.id),0\n                )\n                AND EXTRACT(YEAR FROM c.doc_date) = $1\n                AND EXTRACT(MONTH FROM c.doc_date) = $2\n            ) \n            ORDER BY summa DESC\n            LIMIT 10\n        "), params_2);
        case 41:
          workers = _context2.sent;
          _context2.next = 44;
          return pool.query("--sql\n            SELECT \n                u.region_id,\n                r.name AS region_name,\n                b.id AS batalon_id,\n                b.name AS batalon_name,\n                (\n                    SELECT COALESCE(SUM(t.result_summa), 0)::FLOAT\n                    FROM task AS t\n                    JOIN contract AS c ON c.id = t.contract_id\n                    WHERE t.batalon_id = b.id  AND t.isdeleted = false \n                    AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT \n                        FROM prixod \n                        WHERE isdeleted = false AND contract_id = c.id),0\n                    )\n                    AND EXTRACT(YEAR FROM c.doc_date) = $1\n                    AND EXTRACT(MONTH FROM c.doc_date) = $2\n                ) AS summa,\n                (\n                    SELECT COALESCE(SUM(t.task_time), 0)::FLOAT\n                    FROM task AS t\n                    JOIN contract AS c ON c.id = t.contract_id\n                    WHERE t.batalon_id = b.id  AND t.isdeleted = false \n                    AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT \n                        FROM prixod \n                        WHERE isdeleted = false AND contract_id = c.id),0\n                    )\n                    AND EXTRACT(YEAR FROM c.doc_date) = $1\n                    AND EXTRACT(MONTH FROM c.doc_date) = $2\n                ) AS task_time\n            FROM batalon AS b\n            JOIN users AS u ON u.id = b.user_id\n            JOIN regions AS r ON r.id = u.region_id\n            WHERE b.isdeleted = false ".concat(user_filter_2, " AND 0 < (\n                SELECT COALESCE(SUM(t.task_time), 0)::FLOAT\n                FROM task AS t\n                JOIN contract AS c ON c.id = t.contract_id\n                WHERE t.batalon_id = b.id  AND t.isdeleted = false \n                AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT \n                    FROM prixod \n                    WHERE isdeleted = false AND contract_id = c.id),0\n                )\n                AND EXTRACT(YEAR FROM c.doc_date) = $1\n                AND EXTRACT(MONTH FROM c.doc_date) = $2\n            )   \n            ORDER BY summa DESC\n            LIMIT 10\n        "), params_2);
        case 44:
          batalons = _context2.sent;
          user_result.sort(function (a, b) {
            return b.percent - a.percent;
          });
          return _context2.abrupt("return", {
            itogo: itogo,
            byUser: user_result,
            month: {
              month_sum: month_sum,
              itogo_year: itogo_year
            },
            workers: workers.rows,
            batalons: batalons.rows
          });
        case 49:
          _context2.prev = 49;
          _context2.t0 = _context2["catch"](0);
          throw new ErrorResponse(_context2.t0, _context2.t0.statusCode);
        case 52:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 49]]);
  }));
  return function monitoringService(_x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
module.exports = {
  prixodRasxodService: prixodRasxodService,
  monitoringService: monitoringService
};