'use strict';

var index$1 = require('./index-e76541aa.js');

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
        var _iterator = index$1._createForOfIteratorHelper(value),
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

    return index$1._asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _iterator2, _step2, element;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return index$1.ymaps();

            case 2:
              _this.maps = _context2.sent;
              _this.map = new _this.maps.Map(_this.$refs.map, {
                center: _this.center,
                zoom: _this.zoom,
                behaviors: _this.behaviors,
                controls: _this.controls,
                margin: _this.margin,
                type: _this.type
              }, index$1._objectSpread2({}, _this.options));
              _context2.t0 = _this;
              _context2.next = 7;
              return _this.getGeoObjects();

            case 7:
              _context2.t1 = _context2.sent;

              _context2.t0.setGeoObjects.call(_context2.t0, _context2.t1);

              _iterator2 = index$1._createForOfIteratorHelper(_this.$children);

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  element = _step2.value;
                  element.$on('updated', /*#__PURE__*/function () {
                    var _ref = index$1._asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.t0 = _this;
                              _context.next = 3;
                              return _this.getGeoObjects();

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
    getGeoObjects: function getGeoObjects() {
      var awaitGetGeoObjects = [];

      var _iterator3 = index$1._createForOfIteratorHelper(this.$children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var element = _step3.value;
          awaitGetGeoObjects.push(element.getGeoObject());
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

      var _iterator4 = index$1._createForOfIteratorHelper(geoObjects),
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
