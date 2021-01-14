import { y as ymaps } from './index-a00f3fd0.js';

var polygon = {
    render(h) {
        return h('div', { class: "yandex-polygon_not-used-dom-element" });
    },
    props: {
        geometry: {
            type: Array,
            required: true,
            validator(value) {
                if (value.length === 0) {
                    return false;
                }
                for (let items of value) {
                    if (!Array.isArray(items)) {
                        return false;
                    }
                    for (let points of items) {
                        if (!Array.isArray(points)) {
                            return false;
                        }
                        if (points.length !== 2 || (points.length === 2 && (Number.isNaN(points[0]) || Number.isNaN(points[1])))) {
                            return false;
                        }
                    }
                }
                return true;
            },
        },
        properties: {
            type: Object,
            default() {
                return {};
            },
            validator(value) {
                return Object.keys(value).length > 0 ? "iconContent" in value || "iconCaption" in value || "hintContent" in value || "balloonContent" in value || ("balloonContentHeader" in value && "balloonContentBody" in value && "balloonContentFooter" in value) : true;
            },
        },
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    methods: {
        async getGeoObject() {
            const maps = await ymaps();
            return new maps.Polygon(this.geometry, this.properties, this.options);
        },
    },
};

export default polygon;
