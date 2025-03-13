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
var _require = require('../db/index'),
  db = _require.db;
exports.BatalonDB = /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
  }
  return _createClass(_class, null, [{
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
        var isdeleted,
          result,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              isdeleted = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
              _context.next = 3;
              return db.query("\n            SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada\n            FROM batalon \n            WHERE user_id = $1 \n                AND id = $2\n                ".concat(!isdeleted ? 'AND isdeleted = false' : '', " \n        "), params);
            case 3:
              result = _context.sent;
              return _context.abrupt("return", result[0]);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getById(_x) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
  }, {
    key: "getByName",
    value: function () {
      var _getByName = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
        var isdeleted,
          result,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              isdeleted = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
              _context2.next = 3;
              return db.query("\n            SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada\n            FROM batalon \n            WHERE user_id = $1 AND name = $2\n        ", params);
            case 3:
              result = _context2.sent;
              return _context2.abrupt("return", result[0]);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getByName(_x2) {
        return _getByName.apply(this, arguments);
      }
      return getByName;
    }()
  }]);
}();
var pool = require('../config/db');
var ErrorResponse = require('../utils/errorResponse');
exports.batalonCreateService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
    var result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return db.transaction(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(client) {
              var batalon, _iterator, _step, account, query, _iterator2, _step2, gazna, _query;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return pool.query("\n                INSERT INTO batalon\n                (\n                    name, \n                    birgada, \n                    user_id, \n                    address, \n                    str, \n                    bank_name, \n                    mfo\n                ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [data.name, data.birgada, data.user_id, data.address, data.str, data.bank_name, data.mfo]);
                  case 2:
                    batalon = _context3.sent;
                    _iterator = _createForOfIteratorHelper(data.account_numbers);
                    _context3.prev = 4;
                    _iterator.s();
                  case 6:
                    if ((_step = _iterator.n()).done) {
                      _context3.next = 13;
                      break;
                    }
                    account = _step.value;
                    query = "\n                    INSERT INTO \n                        account_number(\n                            account_number, \n                            batalon_id\n                        ) \n                    VALUES($1, $2) RETURNING *\n                ";
                    _context3.next = 11;
                    return client.query(query, [account.account_number, batalon.rows[0].id]);
                  case 11:
                    _context3.next = 6;
                    break;
                  case 13:
                    _context3.next = 18;
                    break;
                  case 15:
                    _context3.prev = 15;
                    _context3.t0 = _context3["catch"](4);
                    _iterator.e(_context3.t0);
                  case 18:
                    _context3.prev = 18;
                    _iterator.f();
                    return _context3.finish(18);
                  case 21:
                    _iterator2 = _createForOfIteratorHelper(data.gazna_numbers);
                    _context3.prev = 22;
                    _iterator2.s();
                  case 24:
                    if ((_step2 = _iterator2.n()).done) {
                      _context3.next = 31;
                      break;
                    }
                    gazna = _step2.value;
                    _query = "\n                    INSERT INTO \n                        gazna_numbers(\n                            gazna_number, \n                            batalon_id\n                        ) \n                    VALUES($1, $2) RETURNING *\n                ";
                    _context3.next = 29;
                    return client.query(_query, [gazna.gazna_number, batalon.rows[0].id]);
                  case 29:
                    _context3.next = 24;
                    break;
                  case 31:
                    _context3.next = 36;
                    break;
                  case 33:
                    _context3.prev = 33;
                    _context3.t1 = _context3["catch"](22);
                    _iterator2.e(_context3.t1);
                  case 36:
                    _context3.prev = 36;
                    _iterator2.f();
                    return _context3.finish(36);
                  case 39:
                    return _context3.abrupt("return", batalon.rows[0]);
                  case 40:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[4, 15, 18, 21], [22, 33, 36, 39]]);
            }));
            return function (_x4) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", result);
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          throw new ErrorResponse(_context4.t0, _context4.t0.statusCode);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function (_x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.batalonUpdateService = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data) {
    var result;
    return _regeneratorRuntime().wrap(function _callee6$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return db.transaction(/*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(client) {
              var batalon, create_gazna, create_account_number, _iterator3, _step3, _loop, _iterator4, _step4, _gazna, _i, _create_gazna, gazna, _iterator5, _step5, _loop2, _iterator6, _step6, _account_number, _i2, _create_account_numbe, account_number;
              return _regeneratorRuntime().wrap(function _callee5$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return pool.query("UPDATE batalon SET \n                name = $1, \n                birgada = $2,\n                address = $3, \n                str = $4, \n                bank_name = $5, \n                mfo = $6\n                WHERE id = $7 \n                    AND isdeleted = false \n                RETURNING *\n            ", [data.name, data.birgada, data.address, data.str, data.bank_name, data.mfo, data.id]);
                  case 2:
                    batalon = _context7.sent;
                    create_gazna = [];
                    create_account_number = []; // gazna
                    _iterator3 = _createForOfIteratorHelper(data.old_data.gazna_numbers);
                    _context7.prev = 6;
                    _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                      var gazna, check;
                      return _regeneratorRuntime().wrap(function _loop$(_context5) {
                        while (1) switch (_context5.prev = _context5.next) {
                          case 0:
                            gazna = _step3.value;
                            check = data.gazna_numbers.find(function (item) {
                              return item.id === gazna.id;
                            });
                            if (check) {
                              _context5.next = 5;
                              break;
                            }
                            _context5.next = 5;
                            return client.query("UPDATE gazna_numbers SET isdeleted = true WHERE id = $1", [gazna.id]);
                          case 5:
                          case "end":
                            return _context5.stop();
                        }
                      }, _loop);
                    });
                    _iterator3.s();
                  case 9:
                    if ((_step3 = _iterator3.n()).done) {
                      _context7.next = 13;
                      break;
                    }
                    return _context7.delegateYield(_loop(), "t0", 11);
                  case 11:
                    _context7.next = 9;
                    break;
                  case 13:
                    _context7.next = 18;
                    break;
                  case 15:
                    _context7.prev = 15;
                    _context7.t1 = _context7["catch"](6);
                    _iterator3.e(_context7.t1);
                  case 18:
                    _context7.prev = 18;
                    _iterator3.f();
                    return _context7.finish(18);
                  case 21:
                    _iterator4 = _createForOfIteratorHelper(data.gazna_numbers);
                    _context7.prev = 22;
                    _iterator4.s();
                  case 24:
                    if ((_step4 = _iterator4.n()).done) {
                      _context7.next = 34;
                      break;
                    }
                    _gazna = _step4.value;
                    if (_gazna.id) {
                      _context7.next = 30;
                      break;
                    }
                    create_gazna.push(_gazna);
                    _context7.next = 32;
                    break;
                  case 30:
                    _context7.next = 32;
                    return client.query("\n                        UPDATE gazna_numbers \n                        SET gazna_number = $1, updated_at = $2  \n                        WHERE id = $3\n                    ", [_gazna.gazna_number, new Date(), _gazna.id]);
                  case 32:
                    _context7.next = 24;
                    break;
                  case 34:
                    _context7.next = 39;
                    break;
                  case 36:
                    _context7.prev = 36;
                    _context7.t2 = _context7["catch"](22);
                    _iterator4.e(_context7.t2);
                  case 39:
                    _context7.prev = 39;
                    _iterator4.f();
                    return _context7.finish(39);
                  case 42:
                    _i = 0, _create_gazna = create_gazna;
                  case 43:
                    if (!(_i < _create_gazna.length)) {
                      _context7.next = 50;
                      break;
                    }
                    gazna = _create_gazna[_i];
                    _context7.next = 47;
                    return client.query("\n                    INSERT INTO gazna_numbers(gazna_number, batalon_id) \n                    VALUES($1, $2) RETURNING *\n                ", [gazna.gazna_number, batalon.rows[0].id]);
                  case 47:
                    _i++;
                    _context7.next = 43;
                    break;
                  case 50:
                    // account_number
                    _iterator5 = _createForOfIteratorHelper(data.old_data.account_numbers);
                    _context7.prev = 51;
                    _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
                      var account_number, check;
                      return _regeneratorRuntime().wrap(function _loop2$(_context6) {
                        while (1) switch (_context6.prev = _context6.next) {
                          case 0:
                            account_number = _step5.value;
                            check = data.account_numbers.find(function (item) {
                              return item.id === account_number.id;
                            });
                            if (check) {
                              _context6.next = 5;
                              break;
                            }
                            _context6.next = 5;
                            return client.query("UPDATE account_number SET isdeleted = true WHERE id = $1", [account_number.id]);
                          case 5:
                          case "end":
                            return _context6.stop();
                        }
                      }, _loop2);
                    });
                    _iterator5.s();
                  case 54:
                    if ((_step5 = _iterator5.n()).done) {
                      _context7.next = 58;
                      break;
                    }
                    return _context7.delegateYield(_loop2(), "t3", 56);
                  case 56:
                    _context7.next = 54;
                    break;
                  case 58:
                    _context7.next = 63;
                    break;
                  case 60:
                    _context7.prev = 60;
                    _context7.t4 = _context7["catch"](51);
                    _iterator5.e(_context7.t4);
                  case 63:
                    _context7.prev = 63;
                    _iterator5.f();
                    return _context7.finish(63);
                  case 66:
                    _iterator6 = _createForOfIteratorHelper(data.account_numbers);
                    _context7.prev = 67;
                    _iterator6.s();
                  case 69:
                    if ((_step6 = _iterator6.n()).done) {
                      _context7.next = 79;
                      break;
                    }
                    _account_number = _step6.value;
                    if (_account_number.id) {
                      _context7.next = 75;
                      break;
                    }
                    create_account_number.push(_account_number);
                    _context7.next = 77;
                    break;
                  case 75:
                    _context7.next = 77;
                    return client.query("\n                        UPDATE account_number \n                        SET account_number = $1, updated_at = $2  \n                        WHERE id = $3\n                    ", [_account_number.account_number, new Date(), _account_number.id]);
                  case 77:
                    _context7.next = 69;
                    break;
                  case 79:
                    _context7.next = 84;
                    break;
                  case 81:
                    _context7.prev = 81;
                    _context7.t5 = _context7["catch"](67);
                    _iterator6.e(_context7.t5);
                  case 84:
                    _context7.prev = 84;
                    _iterator6.f();
                    return _context7.finish(84);
                  case 87:
                    _i2 = 0, _create_account_numbe = create_account_number;
                  case 88:
                    if (!(_i2 < _create_account_numbe.length)) {
                      _context7.next = 95;
                      break;
                    }
                    account_number = _create_account_numbe[_i2];
                    _context7.next = 92;
                    return client.query("\n                    INSERT INTO account_number(account_number, batalon_id) \n                    VALUES($1, $2) RETURNING *\n                ", [account_number.account_number, batalon.rows[0].id]);
                  case 92:
                    _i2++;
                    _context7.next = 88;
                    break;
                  case 95:
                    return _context7.abrupt("return", batalon.rows[0]);
                  case 96:
                  case "end":
                    return _context7.stop();
                }
              }, _callee5, null, [[6, 15, 18, 21], [22, 36, 39, 42], [51, 60, 63, 66], [67, 81, 84, 87]]);
            }));
            return function (_x6) {
              return _ref4.apply(this, arguments);
            };
          }());
        case 3:
          result = _context8.sent;
          return _context8.abrupt("return", result);
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          throw new ErrorResponse(_context8.t0, _context8.t0.statusCode);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function (_x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getBatalonService = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(user_id) {
    var birgada,
      search,
      search_filter,
      birgada_filter,
      params,
      _yield$pool$query,
      rows,
      _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          birgada = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : null;
          search = _args9.length > 2 ? _args9[2] : undefined;
          _context9.prev = 2;
          search_filter = "";
          birgada_filter = "";
          params = [user_id];
          if (search) {
            search_filter = "AND (\n                    b.str ILIKE  '%' || $".concat(params.length + 1, " || '%' \n                    OR b.name ILIKE  '%' || $").concat(params.length + 1, " || '%'\n                    OR b.address ILIKE  '%' || $").concat(params.length + 1, " || '%'\n                )\n            ");
            params.push(search);
          }
          if (birgada) {
            params.push(birgada);
            birgada_filter = "AND b.birgada = $".concat(params.length);
          }
          _context9.next = 10;
          return pool.query("\n            SELECT \n                b.id, \n                b.name, \n                b.address, \n                b.str, \n                b.bank_name, \n                b.mfo,\n                b.birgada,\n                COALESCE((\n                    SELECT \n                        JSON_AGG(\n                            JSON_BUILD_OBJECT(\n                                'id',    g.id,\n                                'gazna_number', g.gazna_number\n                            )\n                        )\n                    FROM gazna_numbers g\n                    WHERE g.isdeleted = false\n                        AND g.batalon_id = b.id\n                ), '[]'::JSON) AS gazna_numbers,\n                COALESCE((\n                    SELECT \n                        JSON_AGG(\n                            JSON_BUILD_OBJECT(\n                                'id',    a.id,\n                                'account_number', a.account_number\n                            )\n                        )\n                    FROM  account_number a  \n                    WHERE a.isdeleted = false\n                        AND a.batalon_id = b.id\n                ), '[]'::JSON) AS account_numbers\n            FROM batalon b\n            WHERE b.isdeleted = false \n                AND b.user_id = $1 \n                ".concat(search_filter, "\n                ").concat(birgada_filter, "\n            ORDER BY b.id DESC, b.name\n        "), params);
        case 10:
          _yield$pool$query = _context9.sent;
          rows = _yield$pool$query.rows;
          return _context9.abrupt("return", {
            data: rows
          });
        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](2);
          throw new ErrorResponse(_context9.t0, _context9.t0.statusCode);
        case 18:
        case "end":
          return _context9.stop();
      }
    }, _callee7, null, [[2, 15]]);
  }));
  return function (_x7) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getByIdBatalonService = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(user_id, id) {
    var birgada,
      batalon,
      lang,
      result,
      _args10 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          birgada = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : false;
          batalon = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : false;
          lang = _args10.length > 4 ? _args10[4] : undefined;
          _context10.prev = 3;
          _context10.next = 6;
          return pool.query("\n            SELECT \n                b.id, \n                b.name, \n                b.address, \n                b.str, \n                b.bank_name, \n                b.mfo,\n                b.birgada,\n                COALESCE((\n                    SELECT \n                        JSON_AGG(\n                            JSON_BUILD_OBJECT(\n                                'id',    g.id,\n                                'gazna_number', g.gazna_number\n                            )\n                        )\n                    FROM gazna_numbers g\n                    WHERE g.isdeleted = false\n                        AND g.batalon_id = b.id\n                ), '[]'::JSON) AS gazna_numbers,\n                COALESCE((\n                    SELECT \n                        JSON_AGG(\n                            JSON_BUILD_OBJECT(\n                                'id',    a.id,\n                                'account_number', a.account_number\n                            )\n                        )\n                    FROM  account_number a  \n                    WHERE a.isdeleted = false\n                        AND a.batalon_id = b.id\n                ), '[]'::JSON) AS account_numbers\n            FROM batalon b\n            WHERE b.user_id = $1 \n                AND b.id = $2 \n        ", [user_id, id]);
        case 6:
          result = _context10.sent;
          if (result.rows[0]) {
            _context10.next = 9;
            break;
          }
          throw new ErrorResponse(lang.t('batalonNotFound'), 404);
        case 9:
          return _context10.abrupt("return", result.rows[0]);
        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](3);
          throw new ErrorResponse(_context10.t0, _context10.t0.statusCode);
        case 15:
        case "end":
          return _context10.stop();
      }
    }, _callee8, null, [[3, 12]]);
  }));
  return function (_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getByNameBatalonService = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(user_id, name) {
    var check,
      lang,
      result,
      _args11 = arguments;
    return _regeneratorRuntime().wrap(function _callee9$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          check = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : true;
          lang = _args11.length > 3 ? _args11[3] : undefined;
          _context11.prev = 2;
          _context11.next = 5;
          return pool.query("SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada\n            FROM batalon WHERE isdeleted = false AND user_id = $1 AND name = $2\n        ", [user_id, name]);
        case 5:
          result = _context11.sent;
          if (!check) {
            _context11.next = 11;
            break;
          }
          if (!result.rows[0]) {
            _context11.next = 9;
            break;
          }
          throw new ErrorResponse(lang.t('batalonExists'), 409);
        case 9:
          _context11.next = 13;
          break;
        case 11:
          if (result.rows[0]) {
            _context11.next = 13;
            break;
          }
          throw new ErrorResponse(lang.t('batalonNotFound'), 404);
        case 13:
          return _context11.abrupt("return", result.rows[0]);
        case 16:
          _context11.prev = 16;
          _context11.t0 = _context11["catch"](2);
          throw new ErrorResponse(_context11.t0, _context11.t0.statusCode);
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee9, null, [[2, 16]]);
  }));
  return function (_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();
exports.deleteBatalonService = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(id) {
    var result;
    return _regeneratorRuntime().wrap(function _callee10$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return pool.query("UPDATE batalon SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *", [id]);
        case 3:
          result = _context12.sent;
          return _context12.abrupt("return", result.rows[0]);
        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          throw new ErrorResponse(_context12.t0, _context12.t0.statusCode);
        case 10:
        case "end":
          return _context12.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function (_x12) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getOnlyBatalon = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(user_id) {
    var result;
    return _regeneratorRuntime().wrap(function _callee11$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return pool.query("SELECT id, name FROM batalon WHERE isdeleted = false AND user_id = $1 AND birgada = false", [user_id]);
        case 3:
          result = _context13.sent;
          _context13.next = 9;
          break;
        case 6:
          _context13.prev = 6;
          _context13.t0 = _context13["catch"](0);
          throw new ErrorResponse(_context13.t0, _context13.t0.statusCode);
        case 9:
        case "end":
          return _context13.stop();
      }
    }, _callee11, null, [[0, 6]]);
  }));
  return function (_x13) {
    return _ref9.apply(this, arguments);
  };
}();