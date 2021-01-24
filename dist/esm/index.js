/**
 * @param {Vue} Vue
 */
var index = {
    install(Vue){
        Vue.component('v-ymap', ()=> import('./index-7784ec53.js'));
        Vue.component('v-ymap-collection', ()=> import('./collection-e7a4a423.js'));
        Vue.component('v-ymap-clusterer', ()=> import('./clusterer-6a1a1576.js'));
        Vue.component('v-ymap-circle', ()=> import('./circle-234e22db.js'));
        Vue.component('v-ymap-placemark', ()=> import('./placemark-459a01f8.js'));
        Vue.component('v-ymap-polygon', ()=> import('./polygon-691a47af.js'));
        Vue.component('v-ymap-polyline', ()=> import('./polyline-9224fce0.js'));
        Vue.component('v-ymap-rectangle', ()=> import('./rectangle-62c90186.js'));
        Vue.component('v-ymap-route', ()=> import('./route-63fa97cf.js'));
    }
};

export default index;
