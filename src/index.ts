import './index.css'
/**
 * @param {Vue} Vue
 */
export default {
    install(Vue){
        Vue.component('v-ymap', ()=> import("./components/index"));
        Vue.component('v-ymap-collection', ()=> import("./components/collection"));
        Vue.component('v-ymap-clusterer', ()=> import("./components/clusterer"));
        Vue.component('v-ymap-circle', ()=> import("./components/geo-objects/circle"));
        Vue.component('v-ymap-placemark', ()=> import("./components/geo-objects/placemark"));
        Vue.component('v-ymap-polygon', ()=> import("./components/geo-objects/polygon"));
        Vue.component('v-ymap-polyline', ()=> import("./components/geo-objects/polyline"));
        Vue.component('v-ymap-rectangle', ()=> import("./components/geo-objects/rectangle"));
        Vue.component('v-ymap-route', ()=> import("./components/geo-objects/route"));
    }
}