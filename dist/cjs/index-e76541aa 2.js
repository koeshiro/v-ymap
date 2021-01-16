'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var ymaps$1 = {
  load: function load() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '//api-maps.yandex.ru/2.1/?lang=en_RU';

    var getNsParamValue = function getNsParamValue() {
      var results = src.match(/[\\?&]ns=([^&#]*)/);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    if (!this.promise) {
      this.promise = new Promise(function (resolve, reject) {
        var scriptElement = document.createElement('script');
        scriptElement.onload = resolve;
        scriptElement.onerror = reject;
        scriptElement.type = 'text/javascript';
        scriptElement.src = src;
        document.body.appendChild(scriptElement);
      }).then(function () {
        var ns = getNsParamValue();

        if (ns && ns !== 'ymaps') {
          (0, eval)("var ymaps = ".concat(ns, ";"));
        }

        return new Promise(function (resolve) {
          return ymaps.ready(resolve);
        });
      });
    }

    return this.promise;
  }
};

var mapsObject = null;
/**
 * @param {Object} options
 * @param {String} options.YMAPS_KEY - ключ яндекс карт
 * @param {String} options.YMAPS_LANG - версия языка
 * @param {String} options.YMAPS_VERSION - версия яндекс карт
 */

function ymaps$2 (_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
    var o;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(mapsObject === null)) {
              _context.next = 5;
              break;
            }

            o = _objectSpread2({
              YMAPS_VERSION: '2.1'
            }, options);
            _context.next = 4;
            return ymaps$1.load("https://api-maps.yandex.ru/".concat(o.YMAPS_VERSION, "/?").concat('YMAPS_KEY' in o ? "apiKey=".concat(o.YMAPS_KEY, "&") : '').concat('YMAPS_LANG' in o ? "lang=".concat(o.YMAPS_LANG) : ''));

          case 4:
            mapsObject = _context.sent;

          case 5:
            return _context.abrupt("return", mapsObject);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

/**
 * @param {Vue} Vue
 * @param {Object} options
 * @param {String} options.YMAPS_KEY - ключ яндекс карт
 * @param {String} options.YMAPS_LANG - версия языка
 * @param {String} options.YMAPS_VERSION - версия яндекс карт
 */

var index = {
  install: function install(Vue) {
    var _arguments = arguments;
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var options;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
              _context.next = 3;
              return ymaps$2(options);

            case 3:
              Vue.component('v-ymap', function () {
                return Promise.resolve().then(function () { return require('./index-8da54963.js'); });
              });
              Vue.component('v-ymap-collection', function () {
                return Promise.resolve().then(function () { return require('./collection-290d4db0.js'); });
              });
              Vue.component('v-ymap-clusterer', function () {
                return Promise.resolve().then(function () { return require('./clusterer-a032a556.js'); });
              });
              Vue.component('v-ymap-circle', function () {
                return Promise.resolve().then(function () { return require('./circle-76d8dcdd.js'); });
              });
              Vue.component('v-ymap-placemark', function () {
                return Promise.resolve().then(function () { return require('./placemark-acde2b6b.js'); });
              });
              Vue.component('v-ymap-polygon', function () {
                return Promise.resolve().then(function () { return require('./polygon-1a7fc76a.js'); });
              });
              Vue.component('v-ymap-polyline', function () {
                return Promise.resolve().then(function () { return require('./polyline-a5bbd7c5.js'); });
              });
              Vue.component('v-ymap-rectangle', function () {
                return Promise.resolve().then(function () { return require('./rectangle-33762581.js'); });
              });
              Vue.component('v-ymap-route', function () {
                return Promise.resolve().then(function () { return require('./route-b930410b.js'); });
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};

exports._asyncToGenerator = _asyncToGenerator;
exports._createForOfIteratorHelper = _createForOfIteratorHelper;
exports._objectSpread2 = _objectSpread2;
exports._typeof = _typeof;
exports.index = index;
exports.ymaps = ymaps$2;
