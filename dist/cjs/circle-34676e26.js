'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-764e5ec4.js');

var circle = {
  render: function render(h) {
    return h('div', {
      "class": "yandex-circle_not-used-dom-element"
    });
  },
  props: {
    geometry: {
      type: Array,
      required: true,
      validator: function validator(value) {
        return value.length === 2 && Array.isArray(value[0]) && !Number.isNaN(value[0][1]) && !Number.isNaN(value[0][0]) && !Number.isNaN(value[1]);
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
                return _context.abrupt("return", new maps.Circle(_this.geometry, _this.properties, _this.options));

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

exports.default = circle;
