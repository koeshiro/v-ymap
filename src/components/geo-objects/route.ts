import Vue from "vue";

export type RoutePoint = string | {
    type: string;
    point: string | number[];
};

export type RouteParams = {
    avoidTrafficJams?: boolean;
    boundedBy?: number[][];
    mapStateAutoApply?: boolean;
    multiRoute?: boolean;
    reverseGeocoding?: boolean;
    routingMode?: string;
    searchCoordOrder?: string;
    strictBounds?: boolean;
    useMapMargin?: boolean;
    viaIndexes?: number;
    zoomMargin?: number | number[];
};

export type RouteProperties = {
    points: RoutePoint[];
    params: RouteParams;
}

export type RouteMap = {
    route: any;
}

export type RouteMethods = {
    getGeoObject: (maps) => Promise<any>;
}

export const YRoute = Vue.extend<RouteMap,RouteMethods,{},RouteProperties>({
    render(h) {
        return h('div', { class: "yandex-route_not-used-dom-element" });
    },
    data() {
        return {
            route: null,
        }
    },
    props: {
        points: {
            type: [Array],
            required: true,
            validator(value: RoutePoint[]) {
                if (!Array.isArray(value) || value.length === 0) {
                    return false;
                }
                for (let item of value) {
                    if (typeof item === 'string' && item.length === 0) {
                        return false;
                    }
                    if (
                        typeof item === 'object' &&
                        (
                            !(
                                'type' in item &&
                                'point' in item
                            ) ||
                            (
                                'type' in item &&
                                'point' in item &&
                                !['viaPoint', 'wayPoint'].includes(item.type)
                            )
                        )
                    ) {
                        return false;
                    }
                    if (
                        typeof item === 'object' &&
                        item.type === 'viaPoint' &&
                        (
                            typeof item.point !== 'string' ||
                            (
                                typeof item.point === 'string' &&
                                item.point.length === 0
                            )
                        )
                    ) {
                        return false;
                    }
                    if (
                        typeof item === 'object' &&
                        item.type === 'wayPoint' &&
                        !(
                            Array.isArray(item.point) &&
                            item.point.length === 2 &&
                            !Number.isNaN(item.point[0]) &&
                            !Number.isNaN(item.point[1])
                        )
                    ) {
                        return false;
                    }
                }
                return true;
            }
        },
        params: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    watch: {
        points(newV) {
            this.$emit('updated', {
                property: 'points',
                value: newV
            });
        },
        params(newV) {
            this.$emit('updated', {
                property: 'params',
                value: newV
            });
        }
    },
    methods: {
        async getGeoObject(maps) {
            if (this.route === null) {
                this.route = await maps.route(this.points, this.params);
            }
            return this.route;
        }
    }
});
