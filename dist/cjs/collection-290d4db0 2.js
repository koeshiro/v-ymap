'use strict';

var index = require('./index-e76541aa.js');

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
    getGeoObject: function getGeoObject() {
      var _this = this;

      return index._asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var maps, Collection, awaitGetGeoObjects, _iterator, _step, element, getGeoObjects, _iterator2, _step2, getGeoObject;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return index.ymaps();

              case 2:
                maps = _context.sent;
                Collection = new maps.Collection(_this.options);
                awaitGetGeoObjects = [];
                _iterator = index._createForOfIteratorHelper(_this.$children);

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

                _context.next = 9;
                return Promise.all(awaitGetGeoObjects);

              case 9:
                getGeoObjects = _context.sent;
                _iterator2 = index._createForOfIteratorHelper(getGeoObjects);

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

              case 13:
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
