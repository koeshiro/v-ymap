'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-764e5ec4.js');

var collection = {
  render: function render(h) {
    return h('div', {
      "class": "yandex-сollection_not-used-dom-element"
    }, [this.$slots["default"]]);
  },
  props: {
    options: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  methods: {
    getGeoObject: function getGeoObject(maps) {
      var _this = this;

      return _rollupPluginBabelHelpers._asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var Collection, awaitGetGeoObjects, _iterator, _step, element, getGeoObjects, _iterator2, _step2, getGeoObject;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Collection = new maps.Collection(_this.options);
                awaitGetGeoObjects = [];
                _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelper(_this.$children);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    element = _step.value;
                    awaitGetGeoObjects.push(element.getGeoObject());
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context.next = 6;
                return Promise.all(awaitGetGeoObjects);

              case 6:
                getGeoObjects = _context.sent;
                _iterator2 = _rollupPluginBabelHelpers._createForOfIteratorHelper(getGeoObjects);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    getGeoObject = _step2.value;
                    Collection.add(getGeoObject);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                return _context.abrupt("return", Collection);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
};

exports.default = collection;
