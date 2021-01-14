import ymaps from "../ymaps.js";

export default {
    name: "v-ymap",
    render(h) {
        return h('div', { class: "yandex-maps_container" }, [
            h('div', { class: "yandex-maps", "ref":"map" }, [
                h('div', { class: "yandex-maps_slots" }, [this.$slots.default])
            ])
        ]);
    },
    props: {
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
        this.maps = await ymaps();
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
        this.setGeoObjects(await this.getGeoObjects());
        for (let element of this.$children) {
            element.$on('updated', async (e) => {
                this.setGeoObjects(await this.getGeoObjects());
            });
        }
    },
    methods: {
        getGeoObjects() {
            let awaitGetGeoObjects = [];
            for (let element of this.$children) {
                awaitGetGeoObjects.push(element.getGeoObject());
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
}