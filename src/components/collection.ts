import Vue from "vue";

export type CollectionProperties = {
    options: any;
};

export type CollectionMethods = {
    getGeoObject: (maps) => Promise<any>;
    each:(callback: Function, context?: any) => any;
    filter: (filterFunction: Function) => any[];
    get: (index:number) => any;
    getAll: () => any[];
    getIterator: () => Iterator<any>;
    getLength: () => number;
    getMap: () => any;
    getParent: () => any;
    indexOf: (childToFind: any) => number;
    onRemoveFromMap: (oldMap: Function) => void;
    setParent: (parent: any) => any;
};

export type CollectionData = {
    collection: any;
}

export const YCollection = Vue.extend<CollectionData, CollectionMethods, {}, CollectionProperties>({
    render(h) {
        return h('div', { class: "yandex-collection_not-used-dom-element" }, [this.$slots.default]);
    },
    data() {
        return {
            collection: null,
        };
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
        async getGeoObject(maps): Promise<any> {
            if (this.collection === null) {
                this.collection = new maps.Collection(this.options);
            }
            let awaitGetGeoObjects = [];
            for (let element of this.$children) {
                awaitGetGeoObjects.push(element.getGeoObject());
            }
            let getGeoObjects = await Promise.all(awaitGetGeoObjects);
            for (let getGeoObject of getGeoObjects) {
                this.collection.add(getGeoObject);
            }
            return this.collection;
        },
        each(callback: Function, context?: any): any {
            return this.collection.each(callback, context);
        },
        filter(filterFunction: Function): any[] {
            return this.collection.filter(filterFunction);
        },
        get(index: number): any {
            return this.collection.get(index);
        },
        getAll(): any[] {
            return this.collection.getAll();
        },
        getIterator(): Iterator<any> {
            return this.collection.getIterator();
        },
        getLength(): number {
            return this.collection.getLength();
        },
        getMap(): any {
            return this.collection.getMap();
        },
        getParent(): any {
            return this.collection.getParent();
        },
        indexOf(childToFind: any): number {
            return this.collection.indexOf(childToFind);
        },
        onRemoveFromMap(oldMap: Function): void {
            return this.collection.onRemoveFromMap(oldMap);
        },
        setParent(parent: any): any {
            return this.collection.setParent(parent);
        },
    }
});
