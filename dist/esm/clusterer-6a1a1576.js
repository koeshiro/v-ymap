var clusterer = {
    render(h) {
        return h('div', { class: "yandex-clusterer_not-used-dom-element" }, [this.$slots.default]);
    },
    props: {
        gridSize: {
            type: Number,
            default: 64,
            validater(value) {
                return value % 2 === 0
            }
        },
        groupByCoordinates: {
            type: Boolean,
            default: false,
        },
        hasBalloon: {
            type: Boolean,
            default: true
        },
        hasHint: {
            type: Boolean,
            default: true
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
        maxZoom: {
            type: Number,
            default: Infinity,
        },
        minClusterSize: {
            type: Number,
            default: 2,
            validator(value) {
                return value > 0;
            }
        },
        preset: {
            type: String
        },
        showInAlphabeticalOrder: {
            type: Boolean,
            default: false
        },
        useMapMargin: {
            type: Boolean,
            default: true
        },
        viewportMargin: {
            type: Number,
            default: 128
        },
        zoomMargin: {
            type: Number,
            default: 0
        }
    },
    methods: {
        async getGeoObject(maps) {
            let cluster = new maps.Clusterer({
                gridSize: this.gridSize,
                groupByCoordinates: this.groupByCoordinates,
                hasBalloon: this.hasBalloon,
                hasHint: this.hasHint,
                margin: this.margin,
                maxZoom: this.maxZoom,
                minClusterSize: this.minClusterSize,
                preset: this.preset,
                showInAlphabeticalOrder: this.showInAlphabeticalOrder,
                useMapMargin: this.useMapMargin,
                viewportMargin: this.viewportMargin,
                zoomMargin: this.zoomMargin
            });
            let awaitGetGeoObjects = [];
            for (let element of this.$children) {
                awaitGetGeoObjects.push(element.getGeoObject());
            }
            let getGeoObjects = await Promise.all(awaitGetGeoObjects);
            for (let getGeoObject of getGeoObjects) {
                cluster.add(getGeoObject);
            }
            return cluster;
        }
    }
};

export default clusterer;
