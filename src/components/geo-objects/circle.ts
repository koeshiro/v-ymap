import Vue from 'vue';

export type CircleMethod = {
    getGeoObject: (maps) => any;
    getMap: () => any;
    getOverlay: () => Promise<any>;
    getOverlaySync: () => any;
    getParent: () => any;
    setParent: (parent) => Promise<any>;
};

export type CircleContents = {
    iconContent?: string;
    iconCaption?: string;
    hintContent?: string;
    balloonContent?: string;
    balloonContentHeader?: string;
    balloonContentBody?: string;
    balloonContentFooter?: string;
};

export type CircleProperties = {
    geometry: number[][];
    properties: CircleContents;
    options: {
        circleOverlay?: string | Function;
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
    };
};

export type CircleData = {
    circle: any;
};

export const YCircle = Vue.extend<CircleData, CircleMethod, {}, CircleProperties>({
    render(h) {
        return h('div', { class: "yandex-circle_not-used-dom-element" });
    },
    data() {
        return {
            circle: null,
        }
    },
    props: {
        geometry: {
            type: Array,
            required: true,
            validator(value:number[][]) {
                return value.length === 2 && Array.isArray(value[0]) && !Number.isNaN(value[0][1]) && !Number.isNaN(value[0][0]) && !Number.isNaN(value[1]);
            },
        },
        properties: {
            type: Object,
            default(): CircleContents {
                return {};
            },
            validator(value: CircleContents) {
                return Object.keys(value).length > 0
                    ?
                        "iconContent" in value
                        || "iconCaption" in value
                        || "hintContent" in value
                        || "balloonContent" in value
                        || (
                            "balloonContentHeader" in value
                            && "balloonContentBody" in value
                            && "balloonContentFooter" in value
                        )
                    : true;
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
            if (this.circle === null) {
                this.circle = new maps.Circle(this.geometry, this.properties, this.options);
            }
            return this.circle;
        },
        getMap(): any {
            return this.circle.getMap();
        },
        getOverlay(): Promise<any> {
            return this.circle.getOverlay();
        },
        getOverlaySync(): any {
            return this.circle.getOverlaySync();
        },
        getParent(): any {
            return this.circle.getParent();
        },
        setParent(parent): Promise<any> {
            return this.circle.setParent(parent);
        }
    },
});
