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
var _require = require('@db/index'),
  db = _require.db;
var organizationCreateService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return db.transaction(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(client) {
              var organ, _iterator, _step, account, query, _iterator2, _step2, gazna, _query;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return client.query("\n                INSERT INTO \n                    organization(\n                        name,\n                        address,\n                        str,\n                        bank_name, \n                        mfo,\n                        user_id\n                    ) \n                VALUES($1, $2, $3, $4, $5, $6) RETURNING *\n            ", [data.name, data.address, data.str, data.bank_name, data.mfo, data.user_id]);
                  case 2:
                    organ = _context.sent;
                    _iterator = _createForOfIteratorHelper(data.account_numbers);
                    _context.prev = 4;
                    _iterator.s();
                  case 6:
                    if ((_step = _iterator.n()).done) {
                      _context.next = 13;
                      break;
                    }
                    account = _step.value;
                    query = "\n                    INSERT INTO \n                        account_number(\n                            account_number, \n                            organ_id\n                        ) \n                    VALUES($1, $2) RETURNING *\n                ";
                    _context.next = 11;
                    return client.query(query, [account.account_number, organ.rows[0].id]);
                  case 11:
                    _context.next = 6;
                    break;
                  case 13:
                    _context.next = 18;
                    break;
                  case 15:
                    _context.prev = 15;
                    _context.t0 = _context["catch"](4);
                    _iterator.e(_context.t0);
                  case 18:
                    _context.prev = 18;
                    _iterator.f();
                    return _context.finish(18);
                  case 21:
                    _iterator2 = _createForOfIteratorHelper(data.gazna_numbers);
                    _context.prev = 22;
                    _iterator2.s();
                  case 24:
                    if ((_step2 = _iterator2.n()).done) {
                      _context.next = 31;
                      break;
                    }
                    gazna = _step2.value;
                    _query = "\n                    INSERT INTO \n                        gazna_numbers(\n                            gazna_number, \n                            organ_id\n                        ) \n                    VALUES($1, $2) RETURNING *\n                ";
                    _context.next = 29;
                    return client.query(_query, [gazna.gazna_number, organ.rows[0].id]);
                  case 29:
                    _context.next = 24;
                    break;
                  case 31:
                    _context.next = 36;
                    break;
                  case 33:
                    _context.prev = 33;
                    _context.t1 = _context["catch"](22);
                    _iterator2.e(_context.t1);
                  case 36:
                    _context.prev = 36;
                    _iterator2.f();
                    return _context.finish(36);
                  case 39:
                    return _context.abrupt("return", organ.rows[0]);
                  case 40:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[4, 15, 18, 21], [22, 33, 36, 39]]);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", result);
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
  return function organizationCreateService(_x) {
    return _ref.apply(this, arguments);
  };
}();
var organizationUpdateService = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
    var result;
    return _regeneratorRuntime().wrap(function _callee4$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return db.transaction(/*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(client) {
              var organ, create_gazna, create_account_number, _iterator3, _step3, _loop, _iterator4, _step4, _gazna, _i, _create_gazna, gazna, _iterator5, _step5, _loop2, _iterator6, _step6, _account_number, _i2, _create_account_numbe, account_number;
              return _regeneratorRuntime().wrap(function _callee3$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return client.query("\n                UPDATE organization \n                SET \n                    name = $1, \n                    address = $2,\n                    str = $3, \n                    bank_name = $4, \n                    mfo = $5 \n                WHERE id = $6\n                    AND isdeleted = false \n                RETURNING *\n            ", [data.name, data.address, data.str, data.bank_name, data.mfo, data.id]);
                  case 2:
                    organ = _context5.sent;
                    if (organ.rows.length) {
                      _context5.next = 5;
                      break;
                    }
                    throw new Error("Organization not found");
                  case 5:
                    create_gazna = [];
                    create_account_number = []; // gazna
                    _iterator3 = _createForOfIteratorHelper(data.old_data.gazna_numbers);
                    _context5.prev = 8;
                    _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                      var gazna, check;
                      return _regeneratorRuntime().wrap(function _loop$(_context3) {
                        while (1) switch (_context3.prev = _context3.next) {
                          case 0:
                            gazna = _step3.value;
                            check = data.gazna_numbers.find(function (item) {
                              return item.id === gazna.id;
                            });
                            if (check) {
                              _context3.next = 5;
                              break;
                            }
                            _context3.next = 5;
                            return client.query("UPDATE gazna_numbers SET isdeleted = true WHERE id = $1", [gazna.id]);
                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }, _loop);
                    });
                    _iterator3.s();
                  case 11:
                    if ((_step3 = _iterator3.n()).done) {
                      _context5.next = 15;
                      break;
                    }
                    return _context5.delegateYield(_loop(), "t0", 13);
                  case 13:
                    _context5.next = 11;
                    break;
                  case 15:
                    _context5.next = 20;
                    break;
                  case 17:
                    _context5.prev = 17;
                    _context5.t1 = _context5["catch"](8);
                    _iterator3.e(_context5.t1);
                  case 20:
                    _context5.prev = 20;
                    _iterator3.f();
                    return _context5.finish(20);
                  case 23:
                    _iterator4 = _createForOfIteratorHelper(data.gazna_numbers);
                    _context5.prev = 24;
                    _iterator4.s();
                  case 26:
                    if ((_step4 = _iterator4.n()).done) {
                      _context5.next = 36;
                      break;
                    }
                    _gazna = _step4.value;
                    if (_gazna.id) {
                      _context5.next = 32;
                      break;
                    }
                    create_gazna.push(_gazna);
                    _context5.next = 34;
                    break;
                  case 32:
                    _context5.next = 34;
                    return client.query("\n                        UPDATE gazna_numbers \n                        SET gazna_number = $1, updated_at = $2  \n                        WHERE id = $3\n                    ", [_gazna.gazna_number, new Date(), _gazna.id]);
                  case 34:
                    _context5.next = 26;
                    break;
                  case 36:
                    _context5.next = 41;
                    break;
                  case 38:
                    _context5.prev = 38;
                    _context5.t2 = _context5["catch"](24);
                    _iterator4.e(_context5.t2);
                  case 41:
                    _context5.prev = 41;
                    _iterator4.f();
                    return _context5.finish(41);
                  case 44:
                    _i = 0, _create_gazna = create_gazna;
                  case 45:
                    if (!(_i < _create_gazna.length)) {
                      _context5.next = 52;
                      break;
                    }
                    gazna = _create_gazna[_i];
                    _context5.next = 49;
                    return client.query("\n                    INSERT INTO gazna_numbers(gazna_number, organ_id) \n                    VALUES($1, $2) RETURNING *\n                ", [gazna.gazna_number, organ.rows[0].id]);
                  case 49:
                    _i++;
                    _context5.next = 45;
                    break;
                  case 52:
                    // account_number
                    _iterator5 = _createForOfIteratorHelper(data.old_data.account_numbers);
                    _context5.prev = 53;
                    _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
                      var account_number, check;
                      return _regeneratorRuntime().wrap(function _loop2$(_context4) {
                        while (1) switch (_context4.prev = _context4.next) {
                          case 0:
                            account_number = _step5.value;
                            check = data.account_numbers.find(function (item) {
                              return item.id === account_number.id;
                            });
                            if (check) {
                              _context4.next = 5;
                              break;
                            }
                            _context4.next = 5;
                            return client.query("UPDATE account_number SET isdeleted = true WHERE id = $1", [account_number.id]);
                          case 5:
                          case "end":
                            return _context4.stop();
                        }
                      }, _loop2);
                    });
                    _iterator5.s();
                  case 56:
                    if ((_step5 = _iterator5.n()).done) {
                      _context5.next = 60;
                      break;
                    }
                    return _context5.delegateYield(_loop2(), "t3", 58);
                  case 58:
                    _context5.next = 56;
                    break;
                  case 60:
                    _context5.next = 65;
                    break;
                  case 62:
                    _context5.prev = 62;
                    _context5.t4 = _context5["catch"](53);
                    _iterator5.e(_context5.t4);
                  case 65:
                    _context5.prev = 65;
                    _iterator5.f();
                    return _context5.finish(65);
                  case 68:
                    _iterator6 = _createForOfIteratorHelper(data.account_numbers);
                    _context5.prev = 69;
                    _iterator6.s();
                  case 71:
                    if ((_step6 = _iterator6.n()).done) {
                      _context5.next = 81;
                      break;
                    }
                    _account_number = _step6.value;
                    if (_account_number.id) {
                      _context5.next = 77;
                      break;
                    }
                    create_account_number.push(_account_number);
                    _context5.next = 79;
                    break;
                  case 77:
                    _context5.next = 79;
                    return client.query("\n                        UPDATE account_number \n                        SET account_number = $1, updated_at = $2  \n                        WHERE id = $3\n                    ", [_account_number.account_number, new Date(), _account_number.id]);
                  case 79:
                    _context5.next = 71;
                    break;
                  case 81:
                    _context5.next = 86;
                    break;
                  case 83:
                    _context5.prev = 83;
                    _context5.t5 = _context5["catch"](69);
                    _iterator6.e(_context5.t5);
                  case 86:
                    _context5.prev = 86;
                    _iterator6.f();
                    return _context5.finish(86);
                  case 89:
                    _i2 = 0, _create_account_numbe = create_account_number;
                  case 90:
                    if (!(_i2 < _create_account_numbe.length)) {
                      _context5.next = 97;
                      break;
                    }
                    account_number = _create_account_numbe[_i2];
                    _context5.next = 94;
                    return client.query("\n                    INSERT INTO account_number(account_number, organ_id) \n                    VALUES($1, $2) RETURNING *\n                ", [account_number.account_number, organ.rows[0].id]);
                  case 94:
                    _i2++;
                    _context5.next = 90;
                    break;
                  case 97:
                    return _context5.abrupt("return", organ.rows[0]);
                  case 98:
                  case "end":
                    return _context5.stop();
                }
              }, _callee3, null, [[8, 17, 20, 23], [24, 38, 41, 44], [53, 62, 65, 68], [69, 83, 86, 89]]);
            }));
            return function (_x4) {
              return _ref4.apply(this, arguments);
            };
          }());
        case 3:
          result = _context6.sent;
          return _context6.abrupt("return", result);
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          throw new ErrorResponse(_context6.t0.message || "Xatolik yuz berdi", _context6.t0.statusCode || 500);
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function organizationUpdateService(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var getorganizationService = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(user_id, search, offset, limit) {
    var _rows$, filter, params, _yield$pool$query, rows;
    return _regeneratorRuntime().wrap(function _callee5$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          filter = "";
          params = [user_id, offset, limit];
          if (search) {
            filter = "AND (\n                    o.str ILIKE  '%' || $".concat(params.length + 1, " || '%' \n                    OR o.name ILIKE  '%' || $").concat(params.length + 1, " || '%'\n                    OR o.address ILIKE  '%' || $").concat(params.length + 1, " || '%'\n                )\n            ");
            params.push(search);
          }
          _context7.next = 6;
          return pool.query("\n            WITH data AS (\n                SELECT \n                    o.id, \n                    o.name, \n                    o.address, \n                    o.str, \n                    o.bank_name, \n                    o.mfo,\n                    COALESCE((\n                        SELECT \n                            JSON_AGG(\n                                JSON_BUILD_OBJECT(\n                                    'id',    g.id,\n                                    'gazna_number', g.gazna_number\n                                )\n                            )\n                        FROM gazna_numbers g\n                        WHERE g.isdeleted = false\n                            AND g.organ_id = o.id\n                    ), '[]'::JSON) AS gazna_numbers,\n                    COALESCE((\n                        SELECT \n                            JSON_AGG(\n                                JSON_BUILD_OBJECT(\n                                    'id',    a.id,\n                                    'account_number', a.account_number\n                                )\n                            )\n                        FROM  account_number a  \n                        WHERE a.isdeleted = false\n                            AND a.organ_id = o.id\n                    ), '[]'::JSON) AS account_numbers\n                FROM organization o\n                WHERE o.isdeleted = false \n                    AND o.user_id = $1 ".concat(filter, "\n                ORDER BY o.id DESC, o.name \n                OFFSET $2 LIMIT $3\n            )\n            SELECT \n                ARRAY_AGG(row_to_json(data)) AS data,\n                COALESCE((SELECT COUNT(o.id) FROM organization o WHERE o.isdeleted = false AND o.user_id = $1 ").concat(filter, "), 0)::INTEGER AS total_count\n            FROM data\n        "), params);
        case 6:
          _yield$pool$query = _context7.sent;
          rows = _yield$pool$query.rows;
          return _context7.abrupt("return", {
            data: ((_rows$ = rows[0]) === null || _rows$ === void 0 ? void 0 : _rows$.data) || [],
            total: rows[0].total_count
          });
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          throw new ErrorResponse(_context7.t0, _context7.t0.statusCode);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function getorganizationService(_x5, _x6, _x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();
var excelDataOrganizationService = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(user_id) {
    var _rows$2, _yield$pool$query2, rows;
    return _regeneratorRuntime().wrap(function _callee6$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return pool.query("\n            WITH data AS (\n                SELECT name, address, str, bank_name, mfo\n                FROM organization  \n                WHERE isdeleted = false AND user_id = $1\n                ORDER BY name\n            )\n            SELECT \n                ARRAY_AGG(row_to_json(data)) AS data,\n                COALESCE((SELECT COUNT(id) FROM organization WHERE isdeleted = false AND user_id = $1), 0)::INTEGER AS total_count\n            FROM data\n        ", [user_id]);
        case 3:
          _yield$pool$query2 = _context8.sent;
          rows = _yield$pool$query2.rows;
          return _context8.abrupt("return", {
            data: ((_rows$2 = rows[0]) === null || _rows$2 === void 0 ? void 0 : _rows$2.data) || [],
            total: rows[0].total_count
          });
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          throw new ErrorResponse(_context8.t0, _context8.t0.statusCode);
        case 11:
        case "end":
          return _context8.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function excelDataOrganizationService(_x9) {
    return _ref6.apply(this, arguments);
  };
}();
var getByIdorganizationService = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(user_id, id) {
    var isdeleted,
      lang,
      filter,
      result,
      _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          isdeleted = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : false;
          lang = _args9.length > 3 ? _args9[3] : undefined;
          _context9.prev = 2;
          filter = "";
          if (!isdeleted) {
            filter = "AND o.isdeleted = false";
          }
          _context9.next = 7;
          return pool.query("\n            SELECT \n                o.id, \n                o.name, \n                o.address, \n                o.str, \n                o.bank_name, \n                o.mfo,\n                COALESCE((\n                    SELECT \n                        JSON_AGG(\n                            JSON_BUILD_OBJECT(\n                                'id',    g.id,\n                                'gazna_number', g.gazna_number\n                            )\n                        )\n                    FROM gazna_numbers g\n                    WHERE g.isdeleted = false\n                        AND g.organ_id = o.id\n                ), '[]'::JSON) AS gazna_numbers,\n                COALESCE((\n                    SELECT \n                        JSON_AGG(\n                            JSON_BUILD_OBJECT(\n                                'id',    a.id,\n                                'account_number', a.account_number\n                            )\n                        )\n                    FROM  account_number a  \n                    WHERE a.isdeleted = false\n                        AND a.organ_id = o.id\n                ), '[]'::JSON) AS account_numbers\n            FROM organization o\n            WHERE o.user_id = $1 \n                AND o.id = $2 \n                ".concat(filter, " \n        "), [user_id, id]);
        case 7:
          result = _context9.sent;
          if (result.rows[0]) {
            _context9.next = 10;
            break;
          }
          throw new ErrorResponse(lang.t('organizationNotFound'), 404);
        case 10:
          return _context9.abrupt("return", result.rows[0]);
        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](2);
          throw new ErrorResponse(_context9.t0, _context9.t0.statusCode);
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee7, null, [[2, 13]]);
  }));
  return function getByIdorganizationService(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteorganizationService = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id) {
    return _regeneratorRuntime().wrap(function _callee8$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return pool.query("UPDATE organization SET isdeleted = true WHERE id = $1 AND isdeleted = false", [id]);
        case 3:
          _context10.next = 8;
          break;
        case 5:
          _context10.prev = 5;
          _context10.t0 = _context10["catch"](0);
          throw new ErrorResponse(_context10.t0, _context10.t0.statusCode);
        case 8:
        case "end":
          return _context10.stop();
      }
    }, _callee8, null, [[0, 5]]);
  }));
  return function deleteorganizationService(_x12) {
    return _ref8.apply(this, arguments);
  };
}();
var getByStrOrganizationService = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(str, user_id, lang) {
    var _yield$pool$query3, rows;
    return _regeneratorRuntime().wrap(function _callee9$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return pool.query("SELECT organization.* \n            FROM organization \n            WHERE str = $1 AND isdeleted = false AND user_id = $2\n        ", [str, user_id]);
        case 3:
          _yield$pool$query3 = _context11.sent;
          rows = _yield$pool$query3.rows;
          if (!rows[0]) {
            _context11.next = 7;
            break;
          }
          throw new ErrorResponse(lang.t('organizationExists'), 409);
        case 7:
          _context11.next = 12;
          break;
        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          throw new ErrorResponse(_context11.t0, _context11.t0.statusCode);
        case 12:
        case "end":
          return _context11.stop();
      }
    }, _callee9, null, [[0, 9]]);
  }));
  return function getByStrOrganizationService(_x13, _x14, _x15) {
    return _ref9.apply(this, arguments);
  };
}();
module.exports = {
  organizationCreateService: organizationCreateService,
  getorganizationService: getorganizationService,
  getByIdorganizationService: getByIdorganizationService,
  organizationUpdateService: organizationUpdateService,
  deleteorganizationService: deleteorganizationService,
  getByStrOrganizationService: getByStrOrganizationService,
  excelDataOrganizationService: excelDataOrganizationService
};