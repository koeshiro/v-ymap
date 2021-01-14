import { y as ymaps } from './index-a00f3fd0.js';

var placemark = {
    render(h) {
        return h('div', { class: "yandex-placemark_not-used-dom-element" });
    },
    props: {
        geometry: {
            type: Array,
            required: true,
            validator(value) {
                return (
                    value.length === 2 &&
                    !Number.isNaN(value[0]) &&
                    !Number.isNaN(value[1])
                )
            },
        },
        properties: {
            type: Object,
            default() {
                return {}
            },
            validator(value) {
                return Object.keys(value).length > 0
                    ? 'iconContent' in value ||
                    'iconCaption' in value ||
                    'hintContent' in value ||
                    'balloonContent' in value ||
                    ('balloonContentHeader' in value &&
                        'balloonContentBody' in value &&
                        'balloonContentFooter' in value)
                    : true
            },
        },
        options: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    methods: {
        async getGeoObject() {
            const maps = await ymaps();
            return new maps.Placemark(this.geometry, this.properties, this.options);
        }
    }
};

export default placemark;
