export default {
    render(h) {
        return h('div', { class: "yandex-polyline_not-used-dom-element" });
    },
    props: {
        geometry: {
            type: Array,
            required: true,
            validator(value) {
                if (value.length === 0) {
                    return false;
                }
                for (let points of value) {
                    if (!Array.isArray(points)) {
                        return false;
                    }
                    if (points.length !== 2 || (points.length === 2 && (Number.isNaN(points[0]) || Number.isNaN(points[1])))) {
                        return false;
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
        async getGeoObject(maps) {
            return new maps.Polyline(this.geometry, this.properties, this.options);
        },
    },
};