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

let mapsObject = null;
/**
 * @param {Object} options
 * @param {String} options.YMAPS_KEY - ключ яндекс карт
 * @param {String} options.YMAPS_LANG - версия языка
 * @param {String} options.YMAPS_VERSION - версия яндекс карт
 */
async function ymaps$2 (options) {
  if (mapsObject === null) {
    let o = {
      YMAPS_VERSION:'2.1',
      ...options
    };
    mapsObject = await ymaps$1.load(
      `https://api-maps.yandex.ru/${o.YMAPS_VERSION}/?${'YMAPS_KEY' in o ? `apiKey=${o.YMAPS_KEY}&` : ''}${'YMAPS_LANG' in o ? `lang=${o.YMAPS_LANG}` : ''}`
    );
  }
  return mapsObject;
}

var index = {
    name: "v-ymap",
    render(h) {
        return h('div', { class: "yandex-maps_container" }, [
            h('div', { class: "yandex-maps", "ref": "map" }, [
                h('div', { class: "yandex-maps_slots" }, [this.$slots.default])
            ])
        ]);
    },
    props: {
        YMAPS_KEY: {
            type: String,
            default: ''
        },
        YMAPS_LANG: {
            type: String,
            default: 'ru_RU'
        },
        YMAPS_VERSION: {
            type: String,
            default: '2.1'
        },
        center: {
            type: Array,
            required: true,
            validator(value) {
                return value.length === 2 && !Number.isNaN(value[0]) && !Number.isNaN(value[1]);
            }
        },
        zoom: {
            type: Number,
            required: true
        },
        behaviors: {
            type: Array,
            default() {
                return ['default'];
            }
        },
        controls: {
            type: Array,
            default() {
                return ['default'];
            }
        },
        margin: {
            type: Array,
            default() {
                return []
            },
            validator(value) {
                for (let v of value) {
                    if (Number.isNaN(v)) {
                        return false;
                    }
                }
                return true;
            }
        },
        type: {
            type: String,
            default: 'yandex#map',
            validator(value) {
                return ['yandex#map', 'yandex#satellite', 'yandex#hybrid'].includes(value);
            }
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            maps: null,
            map: null
        }
    },
    async mounted() {
        this.maps = await ymaps$2({
            YMAPS_KEY: this.YMAPS_KEY,
            YMAPS_LANG: this.YMAPS_LANG,
            YMAPS_VERSION: this.YMAPS_VERSION
        });
        this.map = new this.maps.Map(this.$refs.map, {
            center: this.center,
            zoom: this.zoom,
            behaviors: this.behaviors,
            controls: this.controls,
            margin: this.margin,
            type: this.type,
        }, {
            ...this.options
        });
        this.setGeoObjects(await this.getGeoObjects(this.maps));
        for (let element of this.$children) {
            element.$on('updated', async (e) => {
                this.setGeoObjects(await this.getGeoObjects(this.maps));
            });
        }
    },
    methods: {
        getGeoObjects(maps) {
            let awaitGetGeoObjects = [];
            for (let element of this.$children) {
                awaitGetGeoObjects.push(element.getGeoObject(maps));
            }
            return Promise.all(awaitGetGeoObjects);
        },
        setGeoObjects(geoObjects) {
            this.map.geoObjects.removeAll();
            for (let getGeoObject of geoObjects) {
                this.map.geoObjects.add(getGeoObject);
            }
        }
    }
};

export default index;
