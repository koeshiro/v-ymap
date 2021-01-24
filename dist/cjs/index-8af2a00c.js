'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-764e5ec4.js');

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
  _ref = _rollupPluginBabelHelpers._asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
    var o;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(mapsObject === null)) {
              _context.next = 5;
              break;
            }

            o = _rollupPluginBabelHelpers._objectSpread2({
              YMAPS_VERSION: '2.1'
            }, options);
            _context.next = 4;
            return ymaps$1.load("https://api-maps.yandex.ru/".concat(o.YMAPS_VERSION, "/?").concat('YMAPS_KEY' in o && o.YMAPS_KEY.length > 0 ? "apiKey=".concat(o.YMAPS_KEY, "&") : '').concat('YMAPS_LANG' in o ? "lang=".concat(o.YMAPS_LANG) : ''));

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

var index = {
  name: "v-ymap",
  render: function render(h) {
    return h('div', {
      "class": "yandex-maps_container"
    }, [h('div', {
      "class": "yandex-maps",
      "ref": "map"
    }, [h('div', {
      "class": "yandex-maps_slots"
    }, [this.$slots["default"]])])]);
  },
  props: {
    YMAPS_KEY: {
      type: String,
      "default": ''
    },
    YMAPS_LANG: {
      type: String,
      "default": 'ru_RU'
    },
    YMAPS_VERSION: {
      type: String,
      "default": '2.1'
    },
    center: {
      type: Array,
      required: true,
      validator: function validator(value) {
        return value.length === 2 && !Number.isNaN(value[0]) && !Number.isNaN(value[1]);
      }
    },
    zoom: {
      type: Number,
      required: true
    },
    behaviors: {
      type: Array,
      "default": function _default() {
        return ['default'];
      }
    },
    controls: {
      type: Array,
      "default": function _default() {
        return ['default'];
      }
    },
    margin: {
      type: Array,
      "default": function _default() {
        return [];
      },
      validator: function validator(value) {
        var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelper(value),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var v = _step.value;

            if (Number.isNaN(v)) {
              return false;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return true;
      }
    },
    type: {
      type: String,
      "default": 'yandex#map',
      validator: function validator(value) {
        return ['yandex#map', 'yandex#satellite', 'yandex#hybrid'].includes(value);
      }
    },
    options: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      maps: null,
      map: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    return _rollupPluginBabelHelpers._asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _iterator2, _step2, element;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return ymaps$2({
                YMAPS_KEY: _this.YMAPS_KEY,
                YMAPS_LANG: _this.YMAPS_LANG,
                YMAPS_VERSION: _this.YMAPS_VERSION
              });

            case 2:
              _this.maps = _context2.sent;
              _this.map = new _this.maps.Map(_this.$refs.map, {
                center: _this.center,
                zoom: _this.zoom,
                behaviors: _this.behaviors,
                controls: _this.controls,
                margin: _this.margin,
                type: _this.type
              }, _rollupPluginBabelHelpers._objectSpread2({}, _this.options));
              _context2.t0 = _this;
              _context2.next = 7;
              return _this.getGeoObjects(_this.maps);

            case 7:
              _context2.t1 = _context2.sent;

              _context2.t0.setGeoObjects.call(_context2.t0, _context2.t1);

              _iterator2 = _rollupPluginBabelHelpers._createForOfIteratorHelper(_this.$children);

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  element = _step2.value;
                  element.$on('updated', /*#__PURE__*/function () {
                    var _ref = _rollupPluginBabelHelpers._asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.t0 = _this;
                              _context.next = 3;
                              return _this.getGeoObjects(_this.maps);

                            case 3:
                              _context.t1 = _context.sent;

                              _context.t0.setGeoObjects.call(_context.t0, _context.t1);

                            case 5:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  methods: {
    getGeoObjects: function getGeoObjects(maps) {
      var awaitGetGeoObjects = [];

      var _iterator3 = _rollupPluginBabelHelpers._createForOfIteratorHelper(this.$children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var element = _step3.value;
          awaitGetGeoObjects.push(element.getGeoObject(maps));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return Promise.all(awaitGetGeoObjects);
    },
    setGeoObjects: function setGeoObjects(geoObjects) {
      this.map.geoObjects.removeAll();

      var _iterator4 = _rollupPluginBabelHelpers._createForOfIteratorHelper(geoObjects),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var getGeoObject = _step4.value;
          this.map.geoObjects.add(getGeoObject);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }
};

exports.default = index;
