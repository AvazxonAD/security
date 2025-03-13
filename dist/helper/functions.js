"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
exports.Functions = /*#__PURE__*/function () {
  function _class() {
    _classCallCheck(this, _class);
  }
  return _createClass(_class, null, [{
    key: "paramsValues",
    value: function paramsValues(data) {
      var index_max = data.params.length;
      var values = '(';
      for (var i = 1; i <= index_max; i++) {
        if (index_max === i) {
          values += " $".concat(i, ")");
        } else if (i % data.column_count === 0) {
          values += " $".concat(i, "), (");
        } else {
          values += "$".concat(i, ", ");
        }
      }
      return values;
    }
  }]);
}();

// old functions 
var cyrlToLatin = {
  Ғ: 'G`',
  ғ: 'g`',
  ў: 'o`',
  Ў: 'O`',
  ъ: '`',
  е: 'e',
  Е: 'E',
  ю: 'iu',
  Ю: 'IU',
  я: 'ya',
  Я: 'Ya',
  ё: 'yo',
  Ё: 'YO',
  б: 'b',
  ч: 'ch',
  ц: 'c',
  ш: 'sh',
  щ: 'shch',
  й: 'y',
  а: 'a',
  д: 'd',
  ф: 'f',
  г: 'g',
  х: 'h',
  и: 'i',
  ж: 'j',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  қ: 'q',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  в: 'v',
  уа: 'w',
  кс: 'x',
  з: 'z',
  Б: 'B',
  Ч: 'CH',
  Ц: 'C',
  Ш: 'SH',
  Щ: 'SHCH',
  Й: 'Y',
  А: 'A',
  Д: 'D',
  Ф: 'F',
  Г: 'G',
  Х: 'H',
  И: 'I',
  Ж: 'J',
  К: 'K',
  Л: 'L',
  М: 'M',
  Н: 'N',
  О: 'O',
  П: 'P',
  Қ: 'Q',
  Р: 'R',
  С: 'S',
  Т: 'T',
  У: 'U',
  В: 'V',
  УА: 'W',
  КС: 'X',
  З: 'Z'
};
var latinToCyrl = {
  "G'": 'Ғ',
  "g'": 'ғ',
  "o'": 'ў',
  "O'": 'Ў',
  'G`': 'Ғ',
  'g`': 'ғ',
  'o`': 'ў',
  'O`': 'Ў',
  "'": 'ъ',
  '`': 'ъ',
  ye: 'е',
  Ye: 'Е',
  yu: 'ю',
  Yu: 'Ю',
  YU: 'Ю',
  ya: 'я',
  YA: 'Я',
  Ya: 'Я',
  yo: 'ё',
  Yo: 'Ё',
  YO: 'Ё',
  b: 'б',
  ch: 'ч',
  ts: 'ц',
  sh: 'ш',
  Sh: 'Ш',
  shch: 'щ',
  iu: 'ю',
  a: 'а',
  c: 'ц',
  d: 'д',
  e: 'е',
  f: 'ф',
  g: 'г',
  h: 'х',
  i: 'и',
  j: 'ж',
  k: 'к',
  l: 'л',
  m: 'м',
  n: 'н',
  o: 'о',
  p: 'п',
  q: 'қ',
  r: 'р',
  s: 'с',
  t: 'т',
  u: 'у',
  v: 'в',
  w: 'уа',
  x: 'x',
  y: 'й',
  z: 'з',
  B: 'Б',
  CH: 'Ч',
  TS: 'Ц',
  SH: 'Ш',
  SHCH: 'Щ',
  IU: 'Ю',
  A: 'А',
  C: 'Ц',
  D: 'Д',
  E: 'Е',
  F: 'Ф',
  G: 'Г',
  H: 'Х',
  I: 'И',
  J: 'Ж',
  K: 'К',
  L: 'Л',
  M: 'М',
  N: 'Н',
  O: 'О',
  P: 'П',
  Q: 'Қ',
  R: 'Р',
  S: 'С',
  T: 'Т',
  U: 'У',
  V: 'В',
  W: 'УА',
  X: 'КС',
  Y: 'Й',
  Z: 'З'
};
exports.textLatinToCyrl = function (string) {
  if (typeof string !== 'string') {
    return '';
  }
  var answer = '';
  for (var i = 0; i < string.length; i++) {
    var threeChars = string.slice(i, i + 3);
    var twoChars = string.slice(i, i + 2);
    if (latinToCyrl[threeChars]) {
      answer += latinToCyrl[threeChars];
      i += 2;
    } else if (latinToCyrl[twoChars]) {
      answer += latinToCyrl[twoChars];
      i += 1;
    } else if (latinToCyrl[string[i]]) {
      answer += latinToCyrl[string[i]];
    } else {
      answer += string[i];
    }
  }
  return answer;
};
exports.textCyrlToLatin = function (string) {
  if (typeof string !== 'string') {
    return '';
  }
  var answer = '';
  var _iterator = _createForOfIteratorHelper(string),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var str = _step.value;
      if (cyrlToLatin[str]) {
        answer = answer + cyrlToLatin[str];
      } else if (latinToCyrl[str]) {
        answer = answer + str;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return !!answer ? answer : '';
};
exports.Functions = /*#__PURE__*/function () {
  function _class2() {
    _classCallCheck(this, _class2);
  }
  return _createClass(_class2, null, [{
    key: "stringSumma",
    value: function stringSumma(num) {
      if (Number.isInteger(num)) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ",00";
      } else {
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(",");
      }
    }
  }]);
}();