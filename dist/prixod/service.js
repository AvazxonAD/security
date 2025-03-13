"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("./db"),
  PrixodDB = _require.PrixodDB;
exports.PrixodService = /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
  }
  return _createClass(_class, null, [{
    key: "checkDocs",
    value: function () {
      var _checkDocs = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
        var result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return PrixodDB.checkDocs([data.contract_id]);
            case 2:
              result = _context.sent;
              return _context.abrupt("return", result);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function checkDocs(_x) {
        return _checkDocs.apply(this, arguments);
      }
      return checkDocs;
    }()
  }]);
}();
var ErrorResponse = require("../utils/errorResponse");
var pool = require("../config/db");
exports.prixodCreateService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var prixod;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return pool.query("\n            INSERT INTO prixod (\n            user_id,\n            organization_id,\n            contract_id,\n            opisanie,\n            doc_num,\n            doc_date,\n            summa,\n            account_number_id,\n            organ_account_number_id, \n            organ_gazna_number_id\n            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *  \n            ", [data.user_id, data.organization_id, data.contract_id, data.opisanie, data.doc_num, data.doc_date, data.summa, data.account_number_id, data.organ_account_number_id, data.organ_gazna_number_id]);
        case 3:
          prixod = _context2.sent;
          return _context2.abrupt("return", prixod.rows[0]);
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
  return function (_x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getPrixodService = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(user_id, from, to, offset, limit, account_number_id, search, organization_id) {
    var params, offset_limit, prixods, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          params = [user_id, from, to, account_number_id];
          offset_limit = "";
          if (offset !== null && limit !== null) {
            offset_limit = "OFFSET $".concat(params.length + 1, " LIMIT $").concat(params.length + 2);
            params.push(offset, limit);
          }
          _context3.next = 6;
          return pool.query("\n            WITH data AS (\n                SELECT \n                    d.id, \n                    c.id AS contract_id,\n                    c.doc_num AS contract_doc_num,\n                    TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS contract_doc_date, \n                    c.result_summa::FLOAT AS contract_summa, \n                    o.id AS organization_id,\n                    o.name AS organization_name,\n                    o.address AS organization_address,\n                    o.str AS organization_str,\n                    o.bank_name AS organization_bank_name,\n                    o.mfo AS organization_mfo,\n                    g.gazna_number,\n                    a.account_number,\n                    d.summa::FLOAT AS prixod_summa, \n                    d.doc_num AS prixod_doc_num,\n                    d.opisanie,\n                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS prixod_date\n                FROM prixod AS d\n                LEFT JOIN gazna_numbers g ON g.id = d.organ_gazna_number_id\n                LEFT JOIN account_number a ON a.id = d.organ_account_number_id \n                JOIN contract AS c ON c.id = d.contract_id \n                JOIN organization AS o ON c.organization_id = o.id \n                WHERE d.isdeleted = false AND d.user_id = $1 AND d.doc_date BETWEEN $2 AND $3 AND d.account_number_id = $4 \n                ORDER BY d.id DESC\n                ".concat(offset_limit, "\n            )\n            SELECT \n                ARRAY_AGG(row_to_json(data)) AS data,\n                (SELECT COALESCE(COUNT(id)::INTEGER, 0)\n                    FROM prixod \n                    WHERE isdeleted = false AND user_id = $1 AND doc_date BETWEEN $2 AND $3 AND account_number_id = $4) AS total_count,\n                (SELECT COALESCE(SUM(summa)::FLOAT, 0)\n                    FROM prixod \n                    WHERE isdeleted = false AND user_id = $1 AND doc_date BETWEEN $2 AND $3 AND account_number_id = $4) AS summa,\n                (SELECT COALESCE(SUM(summa)::FLOAT, 0)\n                    FROM prixod \n                    WHERE isdeleted = false AND user_id = $1 AND doc_date <= $2 AND account_number_id = $4) AS from_balance ,\n                (SELECT COALESCE(SUM(summa)::FLOAT, 0)\n                    FROM prixod \n                    WHERE isdeleted = false AND user_id = $1 AND doc_date <= $3 AND account_number_id = $4) AS to_balance \n            FROM data\n        "), params);
        case 6:
          prixods = _context3.sent;
          result = prixods.rows[0];
          return _context3.abrupt("return", {
            data: (result === null || result === void 0 ? void 0 : result.data) || [],
            total: result.total_count,
            from_balance: result.from_balance,
            to_balance: result.to_balance,
            summa: result.summa
          });
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          throw new ErrorResponse(_context3.t0, _context3.t0.statusCode);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function (_x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getByIdPrixodService = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(user_id, id, account_number_id) {
    var isdeleted,
      lang,
      filter,
      data,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          isdeleted = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : false;
          lang = _args4.length > 4 ? _args4[4] : undefined;
          _context4.prev = 2;
          filter = "";
          if (!isdeleted) {
            filter = "AND d.isdeleted = false";
          }
          _context4.next = 7;
          return pool.query("\n            SELECT \n                d.id, \n                c.id AS contract_id,\n                c.doc_num AS contract_doc_num,\n                TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS contract_doc_date, \n                c.result_summa::FLOAT AS contract_summa, \n                o.id AS organization_id,\n                o.name AS organization_name,\n                o.address AS organization_address,\n                o.str AS organization_str,\n                o.bank_name AS organization_bank_name,\n                o.mfo AS organization_mfo,\n                g.gazna_number,\n                a.account_number,\n                d.organ_gazna_number_id,\n                d.organ_account_number_id,\n                d.summa::FLOAT AS prixod_summa, \n                d.opisanie,\n                d.doc_num AS prixod_doc_num,\n                TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS prixod_date,\n                ( \n                    SELECT \n                        (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT \n                    FROM prixod \n                    WHERE isdeleted = false \n                        AND contract_id = c.id\n                ) AS remaining_balance\n            FROM prixod AS d \n            LEFT JOIN gazna_numbers g ON g.id = d.organ_gazna_number_id\n            LEFT JOIN account_number a ON a.id = d.organ_account_number_id \n            JOIN contract AS c ON c.id = d.contract_id \n            JOIN organization AS o ON c.organization_id = o.id \n            WHERE d.isdeleted = false AND d.user_id = $1 AND d.account_number_id = $3 AND d.id = $2 ".concat(filter, "\n        "), [user_id, id, account_number_id]);
        case 7:
          data = _context4.sent;
          if (data.rows[0]) {
            _context4.next = 10;
            break;
          }
          throw new ErrorResponse(lang.t("docNotFound"), 404);
        case 10:
          return _context4.abrupt("return", data.rows[0]);
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](2);
          throw new ErrorResponse(_context4.t0, _context4.t0.statusCode);
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 13]]);
  }));
  return function (_x11, _x12, _x13) {
    return _ref3.apply(this, arguments);
  };
}();
exports.updatePrixodService = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data) {
    var result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return pool.query("\n            UPDATE prixod SET \n                organization_id = $1,\n                contract_id = $2,\n                opisanie = $3,\n                doc_num = $4,\n                doc_date = $5,\n                summa = $6\n            WHERE id = $7 RETURNING * \n        ", [data.organization_id, data.contract_id, data.opisanie, data.doc_num, data.doc_date, data.summa, data.id]);
        case 3:
          result = _context5.sent;
          return _context5.abrupt("return", result.rows[0]);
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
  return function (_x14) {
    return _ref4.apply(this, arguments);
  };
}();
exports.deletePrixodService = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return pool.query("UPDATE prixod SET isdeleted = true WHERE id = $1 AND isdeleted = false", [id]);
        case 3:
          _context6.next = 8;
          break;
        case 5:
          _context6.prev = 5;
          _context6.t0 = _context6["catch"](0);
          throw new ErrorResponse(_context6.t0, _context6.t0.statusCode);
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 5]]);
  }));
  return function (_x15) {
    return _ref5.apply(this, arguments);
  };
}();