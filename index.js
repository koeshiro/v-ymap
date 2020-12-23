export function install(Vue, options){
    Vue.component('v-yamp', ()=> import("./src/components/index"));
    Vue.component('v-yamp-collection', ()=> import("./src/components/collection"));
    Vue.component('v-yamp-clusterer', ()=> import("./src/components/clusterer"));
    Vue.component('v-yamp-circle', ()=> import("./src/components/geo-objects/circle"));
    Vue.component('v-yamp-placemark', ()=> import("./src/components/geo-objects/placemark"));
    Vue.component('v-yamp-polygon', ()=> import("./src/components/geo-objects/polygon"));
    Vue.component('v-yamp-polyline', ()=> import("./src/components/geo-objects/polyline"));
    Vue.component('v-yamp-rectangle', ()=> import("./src/components/geo-objects/rectangle"));
    Vue.component('v-yamp-route', ()=> import("./src/components/geo-objects/route"));
}