export default {
    render(h) {
        return h('div', { class: "yandex-сollection_not-used-dom-element" }, [this.$slots.default]);
    },
    props: {
        options: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    methods: {
        async getGeoObject(maps) {
            let Collection = new maps.Collection(this.options);
            let awaitGetGeoObjects = [];
            for (let element of this.$children) {
                awaitGetGeoObjects.push(element.getGeoObject());
            }
            let getGeoObjects = await Promise.all(awaitGetGeoObjects);
            for (let getGeoObject of getGeoObjects) {
                Collection.add(getGeoObject);
            }
            return Collection;
        }
    }
}