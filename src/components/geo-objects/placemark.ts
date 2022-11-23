import Vue from 'vue';

export type PlacemarkOptions = {
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

export type PlacemarkContents = {
    iconContent?: string;
    iconCaption?: string;
    hintContent?: string;
    balloonContent?: string;
    balloonContentHeader?: string;
    balloonContentBody?: string;
    balloonContentFooter?: string;
};

export type PlacemarkProperties = {
    geometry: number[];
    properties: PlacemarkContents;
    options: PlacemarkOptions;
};

export type PlacemarkMethods = {
    getGeoObject: (maps) => any;
    getMap: () => any;
    getOverlay: () => Promise<any>;
    getOverlaySync: () => any;
    getParent: () => any;
    setParent: (parent) => Promise<any>;
};

export type PlacemarkData = {
    placemark: any;
};

export const YPlacemark = Vue.extend<PlacemarkData, PlacemarkMethods, {}, PlacemarkProperties>({
    render(h) {
        return h('div', { class: "yandex-placemark_not-used-dom-element" });
    },
    data() {
        return {
            placemark: null,
        };
    },
    props: {
        geometry: {
            type: Array,
            required: true,
            validator(value:number[]) {
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
            validator(value: PlacemarkContents) {
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
            default(): PlacemarkOptions {
                return {} as PlacemarkOptions;
            },
        },
    },
    methods: {
        async getGeoObject(maps) {
            if (this.placemark === null) {
                this.placemark = new maps.Placemark(this.geometry, this.properties, this.options);
            }
            return this.placemark;
        },
        getMap(): any {
            return this.placemark.getMap();
        },
        getOverlay(): Promise<any> {
            return this.placemark.getOverlay();
        },
        getOverlaySync(): any {
            return this.placemark.getOverlaySync();
        },
        getParent(): any {
            return this.placemark.getParent();
        },
        setParent(parent): Promise<any> {
            return this.placemark.setParent(parent);
        }
    }
});
