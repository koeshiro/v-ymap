import Vue from 'vue';

export type PolygonOptions = {
    cursor?: string;
    draggable?: boolean;
    fill?: boolean;
    fillColor?: string;
    fillImageHref?: string;
    fillMethod?: string;
    fillOpacity?: number;
    hasBalloon?: boolean;
    hasHint?: boolean;
    hideIconOnBalloonOpen?: boolean;
    iconOffset: number[];
    iconShape: any;
    interactiveZIndex?: boolean;
    interactivityModel?: string;
    opacity?: number;
    openBalloonOnClick?: boolean;
    openEmptyBalloon?: boolean;
    openEmptyHint?: boolean;
    openHintOnHover?: boolean;
    pane?: string;
    pointOverlay: string | Function;
    syncOverlayInit?: boolean;
    useMapMarginInDragging?: boolean;
    visible?: boolean;
    zIndex?: number;
    zIndexActive?: number;
    zIndexDrag?: number;
    zIndexHover?: number;
};

export type PolygonContents = {
    iconContent?: string;
    iconCaption?: string;
    hintContent?: string;
    balloonContent?: string;
    balloonContentHeader?: string;
    balloonContentBody?: string;
    balloonContentFooter?: string;
};

export type PolygonProperties = {
    geometry: number[][];
    properties: PolygonContents;
    options: PolygonOptions;
};

export type PolygonMethods = {
    getGeoObject: (maps) => any;
    getMap: () => any;
    getOverlay: () => Promise<any>;
    getOverlaySync: () => any;
    getParent: () => any;
    setParent: (parent) => Promise<any>;
};

export type PolygonData = {
    polygon: any;
};

export const YPolygon = Vue.extend<PolygonData, PolygonMethods, {}, PolygonProperties>({
    render(h) {
        return h('div', { class: "yandex-polygon_not-used-dom-element" });
    },
    data() {
        return {
          polygon: null,
        };
    },
    props: {
        geometry: {
            type: Array,
            required: true,
            validator(value: number[][]) {
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
            validator(value: PolygonContents) {
                return Object.keys(value).length > 0 ? "iconContent" in value || "iconCaption" in value || "hintContent" in value || "balloonContent" in value || ("balloonContentHeader" in value && "balloonContentBody" in value && "balloonContentFooter" in value) : true;
            },
        },
        options: {
            type: Object,
            default(): PolygonOptions {
                return {} as PolygonOptions;
            },
        },
    },
    methods: {
        async getGeoObject(maps) {
            if (this.polygon === null) {
                this.polygon = maps.Polygon(this.geometry, this.properties, this.options);
            }
            return this.polygon;
        },
        getMap(): any {
            return this.polygon.getMap();
        },
        getOverlay(): Promise<any> {
            return this.polygon.getOverlay();
        },
        getOverlaySync(): any {
            return this.polygon.getOverlaySync();
        },
        getParent(): any {
            return this.placemark.getParent();
        },
        setParent(parent): Promise<any> {
            return this.placemark.setParent(parent);
        }
    },
});
