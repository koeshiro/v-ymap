import Vue from "vue";

export type PolylineContents = {
    iconContent?: string;
    iconCaption?: string;
    hintContent?: string;
    balloonContent?: string;
    balloonContentHeader?: string;
    balloonContentBody?: string;
    balloonContentFooter?: string;
};

export type PolylineOptions = {
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
    interactiveZIndex?: boolean;
    interactivityModel?: string;
    opacity?: number;
    openBalloonOnClick?: boolean;
    openEmptyBalloon?: boolean;
    openEmptyHint?: boolean;
    openHintOnHover?: boolean;
    outline?: boolean;
    pane?: string;
    strokeColor?: string | string[];
    strokeOpacity?: number | number[];
    strokeStyle?: string
        | string[]
        | { style: string; offset: number; }
        | { style: string; offset: number; }[];
    strokeWidth?: number | number[];
    syncOverlayInit?: boolean;
    useMapMarginInDragging?: boolean;
    visible?: boolean;
    zIndex?: number;
    zIndexActive?: number;
    zIndexDrag?: number;
    zIndexHover?: number;
}

export type PolylineMethods = {
    getGeoObject: (maps) => any;
    getMap: () => any;
    getOverlay: () => Promise<any>;
    getOverlaySync: () => any;
    getParent: () => any;
    setParent: (parent) => Promise<any>;
};

export type PolylineProperties = {
    geometry: number[];
    properties: PolylineContents;
    options: PolylineOptions;
};

export type PolylineData = {
    polyline: any;
};

export const YPolyline = Vue.extend<PolylineData, PolylineMethods, {}, PolylineProperties>({
    render(h) {
        return h('div', { class: "yandex-polyline_not-used-dom-element" });
    },
    data() {
        return {
            polyline: null,
        }
    },
    props: {
        geometry: {
            type: Array,
            required: true,
            validator(value: number[][]) {
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
            default(): PolylineContents {
                return {} as PolylineContents;
            },
            validator(value: PolylineContents) {
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
            if (this.polyline === null) {
                this.polyline = new maps.Polyline(this.geometry, this.properties, this.options)
            }
            return this.polyline;
        },
        getMap(): any {
            return this.polyline.getMap();
        },
        getOverlay(): Promise<any> {
            return this.polyline.getOverlay();
        },
        getOverlaySync(): any {
            return this.polyline.getOverlaySync();
        },
        getParent(): any {
            return this.polyline.getParent();
        },
        setParent(parent): Promise<any> {
            return this.polyline.setParent(parent);
        }
    },
});
