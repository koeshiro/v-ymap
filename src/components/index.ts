import Vue from "vue";
import { MapLoaderOptions, YMapsLoad } from "../ymaps-load";

export type MapTypes = 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid';

export type MapOptions = {
    autoFitToViewport?: string;
    avoidFractionalZoom?: boolean;
    exitFullscreenByEsc?: boolean;
    fullscreenZIndex?: number;
    mapAutoFocus?: boolean;
    maxAnimationZoomDifference?: number;
    maxZoom?: number;
    minZoom?: number;
    nativeFullscreen?: boolean;
    projection?: any;
    restrictMapArea?: boolean | number[][];
    suppressMapOpenBlock?: boolean;
    suppressObsoleteBrowserNotifier?: boolean;
    yandexMapAutoSwitch?: boolean;
    yandexMapDisablePoiInteractivity?: boolean;
};

export type MapProperties = MapLoaderOptions & {
    center: number[];
    zoom: number;
    behaviors?: string[];
    controls?: string[];
    margin?: number[];
    type?: string;
    options?: MapOptions;
};

export type MapData = {
    maps: any;
    map: any;
};

export type MapPanToOption = {
    checkZoomRange?: boolean;
    delay?: number;
    duration?: number;
    flying?: boolean;
    safe?: boolean;
    timingFunction?: string;
    useMapMargin?: boolean;
};

export type MapBoundOption = {
    checkZoomRange?: boolean;
    duration?: number;
    preciseZoom?: boolean;
    timingFunction?: string;
    useMapMargin?: boolean;
    zoomMargin?: number | number[];
};

export type MapCenterOption = {
    checkZoomRange?: boolean;
    duration?: number;
    timingFunction?: string;
    useMapMargin?: boolean;
};

export type MapGlobalPixelCenterOption = {
    checkZoomRange?: boolean;
    duration?: number;
    timingFunction?: string;
    useMapMargin?: boolean;
}

export type MapZoom = {
    checkZoomRange?: boolean;
    duration?: number;
    useMapMargin?: boolean;
};

export type MapMethods = {
    getGeoObjects: (maps:any) => any;
    setGeoObjects: (geoObjects:any) => void;
    getBounds: (options?: { useMapMargin: boolean }) => number[][];
    getCenter: (options?: { useMapMargin: boolean }) => number[];
    getGlobalPixelCenter: (options?: { useMapMargin: boolean }) => number[];
    getPanoramaManager: () => Promise<any>;
    getType: () => string;
    getZoom: () => number;
    panTo: (center:number[] | any[], options?: MapPanToOption) => Promise<any>;
    setBounds: (bounds: number[][], options?: MapBoundOption) => Promise<any>;
    setCenter: (center: number[], zoom?: number, options?: MapCenterOption) => Promise<any>;
    setGlobalPixelCenter: (
        globalPixelCenter: number[],
        zoom?: number,
        options?: MapGlobalPixelCenterOption
    ) => Promise<any>;
    setType: (type: MapTypes | any, options?: { checkZoomRange: boolean }) => Promise<any>;
    setZoom: (zoom: number, options?: MapZoom) => Promise<any>;
};

export const YMap = Vue.extend<MapData, MapMethods, {}, MapProperties>({
    name: "v-ymap",
    render(h) {
        return h('div', { class: "yandex-maps_container" }, [
            h('div', { class: "yandex-maps", "ref": "map" }, [
                h('div', { class: "yandex-maps_slots" }, [this.$slots.default])
            ])
        ]);
    },
    data() {
        return {
            maps: null,
            map: null
        }
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
        YMAPS_LOAD_BY_REQUIRE: {
            type: Boolean,
            default: true
        },
        center: {
            type: Array,
            required: true,
            validator(value:number[]) {
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
            validator(value:number[]) {
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
            default: 'yandex#map' as MapTypes,
            validator(value: MapTypes) {
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
    async mounted() {
        this.maps = await YMapsLoad({
            YMAPS_KEY: this.YMAPS_KEY,
            YMAPS_LANG: this.YMAPS_LANG,
            YMAPS_VERSION: this.YMAPS_VERSION,
            YMAPS_LOAD_BY_REQUIRE: this.YMAPS_LOAD_BY_REQUIRE
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
            element.$on('updated', async () => {
                this.setGeoObjects(await this.getGeoObjects(this.maps));
            });
        }
    },
    destroyed() {
        this.map.destroy();
    },
    methods: {
        getGeoObjects(maps): Promise<any> {
            let awaitGetGeoObjects = [];
            for (let element of this.$children) {
                awaitGetGeoObjects.push(element.getGeoObject(maps));
            }
            return Promise.all(awaitGetGeoObjects);
        },
        setGeoObjects(geoObjects): void {
            this.map.geoObjects.removeAll();
            for (let getGeoObject of geoObjects) {
                this.map.geoObjects.add(getGeoObject);
            }
        },
        getBounds(options?: { useMapMargin: boolean }): number[][] {
            return this.map.getBounds(options);
        },
        getCenter(options?: { useMapMargin: boolean }): number[] {
            return this.map.getCenter(options);
        },
        getGlobalPixelCenter(options?: { useMapMargin: boolean }): number[] {
            return this.map.getGlobalPixelCenter(options);
        },
        getPanoramaManager(): Promise<any> {
            return this.map.getPanoramaManager();
        },
        getType(): string {
            return this.map.getType();
        },
        getZoom(): number {
            return this.map.getZoom();
        },
        panTo(center:number[] | any[], options?: MapPanToOption): Promise<any> {
            return this.map.panTo(center, options);
        },
        setBounds(bounds: number[][], options?: MapBoundOption): Promise<any> {
            return this.map.setBounds(bounds, options);
        },
        setCenter(center: number[], zoom?: number, options?: MapCenterOption): Promise<any> {
            return this.map.setCenter(center, zoom, options);
        },
        setGlobalPixelCenter(
            globalPixelCenter: number[],
            zoom?: number,
            options?: MapGlobalPixelCenterOption
        ): Promise<any> {
            return this.map.setGlobalPixelCenter(globalPixelCenter, zoom, options);
        },
        setType(type: MapTypes | any, options?: { checkZoomRange: boolean }): Promise<any> {
            return this.map.setType(type, options);
        },
        setZoom(zoom: number, options?: MapZoom): Promise<any> {
            return this.map.setZoom(zoom, options);
        },
    }
});
