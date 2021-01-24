'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-764e5ec4.js');

var clusterer = {
  render: function render(h) {
    return h('div', {
      "class": "yandex-clusterer_not-used-dom-element"
    }, [this.$slots["default"]]);
  },
  props: {
    gridSize: {
      type: Number,
      "default": 64,
      validater: function validater(value) {
        return value % 2 === 0;
      }
    },
    groupByCoordinates: {
      type: Boolean,
      "default": false
    },
    hasBalloon: {
      type: Boolean,
      "default": true
    },
    hasHint: {
      type: Boolean,
      "default": true
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
    maxZoom: {
      type: Number,
      "default": Infinity
    },
    minClusterSize: {
      type: Number,
      "default": 2,
      validator: function validator(value) {
        return value > 0;
      }
    },
    preset: {
      type: String
    },
    showInAlphabeticalOrder: {
      type: Boolean,
      "default": false
    },
    useMapMargin: {
      type: Boolean,
      "default": true
    },
    viewportMargin: {
      type: Number,
      "default": 128
    },
    zoomMargin: {
      type: Number,
      "default": 0
    }
  },
  methods: {
    getGeoObject: function getGeoObject(maps) {
      var _this = this;

      return _rollupPluginBabelHelpers._asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var cluster, awaitGetGeoObjects, _iterator2, _step2, element, getGeoObjects, _iterator3, _step3, getGeoObject;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cluster = new maps.Clusterer({
                  gridSize: _this.gridSize,
                  groupByCoordinates: _this.groupByCoordinates,
                  hasBalloon: _this.hasBalloon,
                  hasHint: _this.hasHint,
                  margin: _this.margin,
                  maxZoom: _this.maxZoom,
                  minClusterSize: _this.minClusterSize,
                  preset: _this.preset,
                  showInAlphabeticalOrder: _this.showInAlphabeticalOrder,
                  useMapMargin: _this.useMapMargin,
                  viewportMargin: _this.viewportMargin,
                  zoomMargin: _this.zoomMargin
                });
                awaitGetGeoObjects = [];
                _iterator2 = _rollupPluginBabelHelpers._createForOfIteratorHelper(_this.$children);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    element = _step2.value;
                    awaitGetGeoObjects.push(element.getGeoObject());
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                _context.next = 6;
                return Promise.all(awaitGetGeoObjects);

              case 6:
                getGeoObjects = _context.sent;
                _iterator3 = _rollupPluginBabelHelpers._createForOfIteratorHelper(getGeoObjects);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    getGeoObject = _step3.value;
                    cluster.add(getGeoObject);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                return _context.abrupt("return", cluster);

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

exports.default = clusterer;
