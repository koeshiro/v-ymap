import './src/components/index.css'
export function install(Vue, options){
    Vue.component('v-ymap', ()=> import("./src/components/index"));
    Vue.component('v-ymap-collection', ()=> import("./src/components/collection"));
    Vue.component('v-ymap-clusterer', ()=> import("./src/components/clusterer"));
    Vue.component('v-ymap-circle', ()=> import("./src/components/geo-objects/circle"));
    Vue.component('v-ymap-placemark', ()=> import("./src/components/geo-objects/placemark"));
    Vue.component('v-ymap-polygon', ()=> import("./src/components/geo-objects/polygon"));
    Vue.component('v-ymap-polyline', ()=> import("./src/components/geo-objects/polyline"));
    Vue.component('v-ymap-rectangle', ()=> import("./src/components/geo-objects/rectangle"));
    Vue.component('v-ymap-route', ()=> import("./src/components/geo-objects/route"));
}