import ymaps from '../../ymaps';

export default {
    render(h) {
        return h('div', { class: "yandex-route_not-used-dom-element" });
    },
    props: {
        points: {
            type: [Array],
            required: true,
            validator(value) {
                if (!Array.isArray(value)) {
                    return false;
                }
                if (value.length === 0) {
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
        points(newV, oldV) {
            this.$emit('updated', {
                property: 'points',
                value: newV
            });
        },
        params(newV, oldV) {
            this.$emit('updated', {
                property: 'params',
                value: newV
            });
        }
    },
    methods: {
        async getGeoObject() {
            const maps = await ymaps();
            let route = await maps.route(this.points, this.params);
            return route;
        }
    }
}