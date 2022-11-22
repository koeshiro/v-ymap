import Vue from "vue";

export type BalloonProperties = {
    autoPan: boolean;
    autoPanCheckZoomRange: boolean;
    autoPanDuration: number;
    autoPanMargin: number | number[];
    autoPanUseMapMargin: boolean;
    closeButton: boolean;
    closeTimeout: number;
    contentLayout: Function | string;
    interactivityModel: string;
    layout: Function | string;
    maxHeight: number;
    maxWidth: number;
    minHeight: number;
    minWidth: number;
    offset: number[];
    openTimeout: number;
    pane: string;
    panelContentLayout: Function | string;
    panelMaxHeightRatio: number;
    panelMaxMapArea: number;
    shadow: boolean;
    shadowLayout: Function | string;
    shadowOffset: number[];
    zIndex: string;
};

export type BalloonMethods = {
    getGeoObject: (maps: any) => Promise<void>;
    autoPan: () => void;
    close: (force?:boolean) => void;
    getData: () => any;
    getOverlay: () => Promise<any>;
    getOverlaySync: () => any;
    getPosition: () => any;
    isOpen: () => boolean;
    open: (position?: any, data?:any) => Promise<any>;
    setData: (data: any) => Promise<any>;
    setPosition: (position) => Promise<any>;
}

export type BalloonData = {
    balloon: any
};

export const YBalloon = Vue.extend<
    BalloonData,
    BalloonMethods,
    {},
    BalloonProperties
>({
    render(h) {
        return h('div', { class: "yandex-balloon_not-used-dom-element" });
    },
    props: {
        autoPan: Boolean,
        autoPanCheckZoomRange: Boolean,
        autoPanDuration: Number,
        autoPanMargin: {
            type: [Number, Array],
        },
        autoPanUseMapMargin: Boolean,
        closeButton: Boolean,
        closeTimeout: Number,
        contentLayout: {
            type: [Function, String],
        },
        interactivityModel: String,
        layout: {
            type: [Function, String],
        },
        maxHeight: Number,
        maxWidth: Number,
        minHeight: Number,
        minWidth: Number,
        offset: Array,
        openTimeout: Number,
        pane: String,
        panelContentLayout: {
            type: [Function, String],
        },
        panelMaxHeightRatio: Number,
        panelMaxMapArea: Number,
        shadow: Boolean,
        shadowLayout: {
            type: [Function, String],
        },
        shadowOffset: Array,
        zIndex: String,
    },
    data() {
        return {
            balloon: null,
        }
    },
    methods: {
        async getGeoObject(maps) {
            if (this.balloon === null) {
                this.balloon = await maps.Balloon(maps, this.$options);
            }
            return this.balloon;
        },
        autoPan(): Promise<any> {
            return this.balloon.autoPan();
        },
        close(force?:boolean): Promise<any>  {
            return this.balloon.close(force);
        },
        getData(): any {
            return this.balloon.getData();
        },
        getOverlay(): Promise<any> {
            return this.balloon.getOverlay();
        },
        getOverlaySync(): any {
            return this.balloon.getOverlaySync();
        },
        getPosition(): any {
            return this.balloon.getPosition();
        },
        isOpen(): boolean {
            return this.balloon.isOpen();
        },
        open(position?: any, data?:any): Promise<any> {
            return this.balloon.open(position, data);
        },
        setData(data: any): Promise<any> {
            return this.balloon.setData(data);
        },
        setPosition(position): Promise<any> {
            return this.balloon.setPosition(position);
        }
    }
});
