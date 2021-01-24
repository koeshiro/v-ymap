'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-764e5ec4.js');

var polyline = {
  render: function render(h) {
    return h('div', {
      "class": "yandex-polyline_not-used-dom-element"
    });
  },
  props: {
    geometry: {
      type: Array,
      required: true,
      validator: function validator(value) {
        if (value.length === 0) {
          return false;
        }

        var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelper(value),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var points = _step.value;

            if (!Array.isArray(points)) {
              return false;
            }

            if (points.length !== 2 || points.length === 2 && (Number.isNaN(points[0]) || Number.isNaN(points[1]))) {
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
    properties: {
      type: Object,
      "default": function _default() {
        return {};
      },
      validator: function validator(value) {
        return Object.keys(value).length > 0 ? "iconContent" in value || "iconCaption" in value || "hintContent" in value || "balloonContent" in value || "balloonContentHeader" in value && "balloonContentBody" in value && "balloonContentFooter" in value : true;
      }
    },
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
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new maps.Polyline(_this.geometry, _this.properties, _this.options));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
};

exports.default = polyline;
